const {Router} = require("express")
const axios = require ("axios")
const { Temperaments } = require("../db")
const router = Router()


router.get("/", async (req, res) => {
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

module.exports = router