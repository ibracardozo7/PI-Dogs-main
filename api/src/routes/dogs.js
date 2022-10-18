const {Router} = require("express")
const axios = require("axios")
const { Dogs, Temperaments } = require("../db")
const router = Router()

// const {allDogs} = require("../controllers/controllers")


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

router.get("/",async (req, res) => {
    let {name} = req.query

    try {
        let dogsTotal = await allDogs()
        if (name) {
            let dogsName = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()))
            dogsName.length ? res.status(200).send(dogsName) :
            res.status(404).send("Dog no econtrado")
        } else {
            res.status(200).send(dogsTotal)
        }

    } catch (error) {
        return res.status(404).send("Error buscando todos los dogs")
    }
})


router.get("/:id", async (req, res) => {
    let {id} = req.params

    try {
        const dogsId = await allDogs()
        if (id) {
            let dogId = await dogsId.find(e => e.id == id)
            console.log(dogId)
            if (dogId) {
                
            return res.json(dogId) 
            }
            else {
               return res.json({message : "No se encontro perro con tal id"})
            } 
                
        }

    } catch (error) {
         res.status(404).send("Hubo un error")
    }
})


router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        await Dogs.destroy({
            where : {
                id: id
            }}
         )
         res.status(200).send("Eliminado")
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router