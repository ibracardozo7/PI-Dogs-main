import React, { useState } from "react";
import {useDispatch} from "react-redux"
import {getNameDog} from "../../Redux/action"
import style from "./SearchBar.module.css"


export default function SearchBar () {

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInput (e) {
        e.preventDefault()
        console.log(e.target.value)
        setName(e.target.value)
    }
    
    function handleSubmit (e) {
        e.preventDefault()
        if (name.length === 0) alert("Necesitas poner un nombre")
        dispatch(getNameDog(name))
        // setName("")
        // console.log("-->", name)
        document.getElementById('searchButton').value=''
        
    }

    return (
        <div className={style.search}>
            <input className={style.input} type="text" id="searchButton" placeholder="Buscar..." onChange={(e) => {handleInput(e)}} />
            <button className={style.button} type="submit" onClick={(e) => {handleSubmit(e)}} >Buscar Dog</button>
        </div>
    )
}