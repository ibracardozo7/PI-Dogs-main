import React from "react";
import style from "./Paginado.module.css"

export default function Paginado ({dogsPerPage, allDogs, paginado}) {

    let pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i)    
    }

    return (
        <nav>
        <div className={style.div} >
            {
                pageNumbers?.map(number => (
                    <button className={style.boton} onClick={() =>{paginado(number)}} key={number} >
                        {number}
                    </button>
                ))
            }
        </div>
        </nav>
    )
}