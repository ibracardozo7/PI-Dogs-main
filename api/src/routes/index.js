const { Router } = require('express');
const axios = require("axios")
const { Dogs, Temperaments} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const dogsApiInfo = async () => {
    const dogsApi = await axios.get("https://api.thedogapi.com/v1/breeds")
    const dogsDetail = dogsApi.data.map(e => {

    let temperamentArray = [];
    if (e.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
        temperamentArray = e.temperament.split(", ");
    }
        
    let heightArray = [];
    if (e.height.metric) {
        heightArray = e.height.metric.split(" - ");
    }

    let weightArray = [];
    if (e.weight.metric) {
        weightArray = e.weight.metric.split(" - ");
    }

        return {
            id: e.id,
            name: e.name,
            height: heightArray,
            weight: weightArray,
            life_span: e.life_span,
            temperament: temperamentArray,
            image: e.image.url
        }
    })
    return dogsDetail
}

const dogsDbInfo = async () => {
    const dogsBd = await Dogs.findAll({
        include: {
            model: Temperaments,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })

    const dogsDbFinal = dogsBd.map(e => {
        return {
            id: e.id,
            name: e.name,
            height: e.height,
            weight: e.weight,
            life_span: e.life_span,
            image: e.image,
            temperament: e.temperaments.map(e => e.name),
            created: e.created
        }
    })
    return dogsDbFinal;
}

const allDogs = async () => {
    const apiInfo = await dogsApiInfo();
    const dbInfo = await dogsDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
} 

router.get("/dogs",async (req, res) => {
    let {name} = req.query

    try {
        let dogsTotal = await allDogs()
        if (name) {
            let dogsName = await dogsTotal.filter(e => e.name.toLowerCase() === name.toLowerCase())
            dogsName.length ? res.status(200).send(dogsName) :
            res.status(404).send("Dog no econtrado")
        } else {
            res.status(200).send(dogsTotal)
        }

    } catch (error) {
        return res.status(404).send("Error buscando todos los dogs")
    }
    })
    
    router.get("/dogs/:id", async (req, res) => {
    let {id} = req.params

    try {
        const dogsId = await allDogs()
        if (id) {
            let dogId = await dogsId.filter(e => e.id == id)
            dogId.length ?
            res.send(dogId) :
            res.status(404).send("Dog no encontrado")
        }

    } catch (error) {
        return res.status(404).send("Hubo un error")
    }
})

router.get("/temperaments", async (req, res) => {
    const temperamentApi = await axios.get("https://api.thedogapi.com/v1/breeds")
    const temperament = temperamentApi.data.map(e => e.temperament)
    const temps = temperament.toString().split(",")
    temps.forEach(e => {
        let i = e.trim()
        Temperaments.findOrCreate({
            where: {
                name: i
            }
        })
    });
    const allTemp = await Temperaments.findAll()
    res.send(allTemp)
})

router.post("/dogs", async (req, res) => {
    console.log(req.body)
    let {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        image,
        temperament
    } = req.body

    try {
        
        const fixedHeight = []
        const minHeight = min_height;
        const maxHeight = max_height;
        fixedHeight.push(minHeight, maxHeight)
        
        const fixedWeight = []
        const minWeight = min_weight;
        const maxWeight = max_weight;
        fixedWeight.push(minWeight, maxWeight)
        
        let dogNew = await Dogs.create({
            name,
            height: fixedHeight,
            weight: fixedWeight,
            life_span,
            image,
        })
        
        let addTemp = await Temperaments.findAll({
            where: {
                name: temperament
            }
        })
        
        dogNew.addTemperaments(addTemp)
        res.status(200).send("¡Perro creado con éxito!")

    } catch (error) {
        return res.status(404).send("Error al crear Dog")
    }
    })
    
    module.exports = router;
