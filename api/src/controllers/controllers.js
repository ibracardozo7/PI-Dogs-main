// const axios = require("axios")
// const { Dogs, Temperaments } = require("../db")
 
//  const dogsApiInfo = async () => {
//     const dogsApi = await axios.get("https://api.thedogapi.com/v1/breeds")
//     const dogsDetail = dogsApi.data.map(e => {

//     let temperamentArray = [];
//     if (e.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
//         temperamentArray = e.temperament.split(", ");
//     }
        
//     let heightArray = [];
//     if (e.height.metric) {
//         heightArray = e.height.metric.split(" - ");
//     }

//     let weightArray = [];
//     if (e.weight.metric) {
//         weightArray = e.weight.metric.split(" - ");
//     }

//         return {
//             id: e.id,
//             name: e.name,
//             height: heightArray,
//             weight: weightArray,
//             life_span: e.life_span,
//             temperament: temperamentArray,
//             image: e.image.url
//         }
//     })
//     return dogsDetail
// }

// const dogsDbInfo = async () => {
//     const dogsBd = await Dogs.findAll({
//         include: {
//             model: Temperaments,
//             attributes: ["name"],
//             through: {
//                 attributes: [],
//             }
//         }
//     })

//     const dogsDbFinal = dogsBd.map(e => {
//         return {
//             id: e.id,
//             name: e.name,
//             height: e.height,
//             weight: e.weight,
//             life_span: e.life_span,
//             image: e.image,
//             temperament: e.temperaments.map(e => e.name),
//             created: e.created
//         }
//     })
//     return dogsDbFinal;
// }

// export const allDogs = async () => {
//     const apiInfo = await dogsApiInfo();
//     const dbInfo = await dogsDbInfo();
//     const infoTotal = apiInfo.concat(dbInfo);
//     return infoTotal;
// }
