const { Router,json } = require('express');
const dogsRoute = require("./dogs")
const temperamentsRoute = require("./temperaments")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRoute)
router.use("/temperaments", temperamentsRoute)

module.exports = router;
