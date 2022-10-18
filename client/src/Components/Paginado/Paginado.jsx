import React from "react";
import style from "./Paginado.module.css"

export default function Paginado ({dogsPerPage, allDogs, paginado, currentPage, setCurrentPage}) {

    let pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i)    
    }

    function nextPage () {
        if (currentPage < Math.ceil(allDogs / dogsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    function previousPage () {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <nav>
        <div className={style.div} >
            <button onClick={previousPage} className={style.botonPage} ><i className={"fa-solid fa-arrow-left"} ></i></button>
            {
                pageNumbers?.map(number => (
                    <button className={style.boton} onClick={() =>{paginado(number)}} key={number} >
                        {number}
                    </button>
                ))
            }
            <button onClick={nextPage} className={style.botonPage} ><i className={"fa-solid fa-arrow-right"} ></i></button>
        </div>
        </nav>
    )
}