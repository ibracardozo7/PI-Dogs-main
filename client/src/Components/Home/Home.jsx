import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {getDogs, getTemperaments, filterByTemperaments, filterByCreate, sortByName, sortByWeight} from "../../Redux/action"
import DogCard from "../DogCard/DogCard"
import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css"
// import loading from "../../Img/loading.gif"


export default function Home () {

const dispatch = useDispatch()
const allDogs = useSelector((state) => state.dogs)
const allTemperaments = useSelector((state) => state.temperaments)
console.log("-->",allDogs)

const [currentPage, setCurrentPage] = useState(1);
const dogsPerPage = 8;
const lastIndex = currentPage * dogsPerPage;
const firstIndex = lastIndex - dogsPerPage;
const currentDog = allDogs.slice(firstIndex, lastIndex)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}
const [order, setOrder] = useState("")
const [home, setHome] = useState(null)


useEffect(() => {
    dispatch(getTemperaments())
    dispatch(getDogs())
    .then((data) => {
        setHome(data.payload)
        console.log("-----------------------",data.payload)
    })
},[])



// function handleClick (e){
//     e.preventDefault();
//     dispatch(getDogs())
//     // console.log("Ready")
// }

function loadAgain(){
    window.location.reload()
}

function handleTemperament (e) {
    e.preventDefault()
    dispatch(filterByTemperaments(e.target.value))
    setCurrentPage(1)
}

function handleCreate (e) {
    e.preventDefault()
    dispatch(filterByCreate(e.target.value))
    setCurrentPage(1)
}

function handleName (e) {
    e.preventDefault()
    dispatch(sortByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
}

function handleWeight (e) {
    e.preventDefault()
    dispatch(sortByWeight(e.target.value))
    setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
}

return (
    <div  >
        <div className={style.container} >
        <Link to="/dog">
            <button className={style.botones}> <i className="fa-solid fa-plus"></i> Add Dog</button>
        </Link>
        <button className={style.botones} onClick={loadAgain} >Volver a cargar</button>
        <div>
            <select className={style.botoneSelect} onChange={(e) =>{handleName(e)}} >
                <option disabled selected defaultValue>Name...</option>
                <option value="asc" >A - Z</option>
                <option value="desc" >Z - A</option>
            </select>

            <select className={style.botoneSelect} onChange={(e) => {handleWeight(e)}} >
                <option disabled selected defaultValue>Weight...</option>
                <option value="min_weight" >Min</option>
                <option value="max_weight" >Max</option>
            </select>

            <select className={style.botoneSelect} onChange={ (e) => {handleTemperament(e)}}>
                <option disabled selected defaultValue>Temperaments</option>
                <option value="All">All</option>
                    {
                        allTemperaments?.map(e => {
                            if (e.name) {
                                return <option value={e.name} key={e.id} >{e.name}</option>    
                            } 
                         
                        })
                    }
                
            </select>

            <select className={style.botoneSelect} onChange={(e) => {handleCreate(e)}}>
                <option disabled selected defaultValue>Dogs</option>
                <option value="All" >All</option>
                <option value="api" >Api</option>
                <option value="created" >Craete</option>
            </select>
        </div>
        <SearchBar setCurrentPage={setCurrentPage} />
        </div>

        {
            home ? 
            
            <div className={style.containerMain} >
                <Paginado currentPage={currentPage} setCurrentPage={setCurrentPage} dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
                
              <div className={style.allCards}>
              { 
                currentDog?.map(e => {
                    return (
                        <DogCard key={e.id} id={e.id} name={e.name} image={e.image} temperament={e.temperament} weight={e.weight} />
                        )
                    })
              }
              </div>
            </div>

            :

            <div className={style.loading} >
                    {/* <p>Loading</p> */}
                    {/* <img src={loading} alt="loading..." /> */}
                    {/* <img src={loading1} alt="loading..." /> */}
            </div>
        }

        <div className={style.footer}>
            <div className={style.footerDiv}>
                <h4 className={style.footerNameHenry}>Henry. 💛</h4>
                <div className={style.botonFooter} ><i className="fa-brands fa-instagram"></i></div>
                <div className={style.botonFooter} ><i className="fa-brands fa-github"></i></div>
                <div className={style.botonFooter} ><i className="fa-brands fa-linkedin"></i></div>
                <h4 className={style.footerName}>© Xavier Ibrahim Cardozo 2022.</h4>
            </div>
        </div>

    </div>
)

}
