import React, { useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {postDog, getTemperaments} from "../../Redux/action"
import style from "./DogCreate.module.css"


export default function DogCreate () {

const dispatch = useDispatch();
const alltempe = useSelector((state) => state.temperaments)

function validate (input) {
    let errors = {};

    if (input.name.trim().length === 0) errors.name = "Tu nueva raza no debe tener espacio"
    
    if (!input.name) errors.name = "¡Tu nueva Raza debe tener un nombre!"

    if(!input.min_height || !input.max_height) errors.height = "Tu nueva Raza necesita una altura (Cm)"

    if(parseInt(input.min_height) < 0 || parseInt(input.max_height) < 0) errors.height = "Tu nueva Raza no puede tener menos de 0 (Cm)"

    if( parseInt(input.min_height) > parseInt(input.max_height) ) errors.height = "Tu Altura minima no puede ser mayor a la altura maxima"

    if(!input.min_weight || !input.max_weight) errors.weight = "Tu nueva Raza necesita un peso (Kg)"

    if( parseInt(input.min_weight) > parseInt( input.max_weight) ) errors.weight = "Tu peso minimo no puede ser mayor al peso maximo"

    if(!input.life_span) errors.life_span = "Tu nueva Raza requiere una vida util"

    if(!input.image) errors.image = "Tu nueva Raza aún no tiene imagen."

    if(input.temperament.length === 0 ) errors.temperament = "¡Tu nueva Raza necesita al menos un temperamento!"

    return errors

}

const [errors, setErrors] = useState({
    name: "¡Tu nueva Raza debe tener un nombre!",
    height: "Tu nueva Raza necesita una altura (Cm)",
    weight : "Tu nueva Raza necesita un peso (Kg)",
    life_span: "Tu nueva Raza requiere una vida util", 
    image: "Tu nueva Raza aún no tiene imagen.", 
    temperament: "¡Tu nueva Raza necesita al menos un temperamento!"
})

const [input, setInput] = useState({
    name: "",
    min_height: 0,
    max_height: 0, 
    min_weight : 0,
    max_weight : 0,
    life_span: 0, 
    image: "", 
    temperament: []
})

console.log(input)

useEffect(() => {
    dispatch(getTemperaments())
},[])

function handleInput (e) {
    // e.preventDefault()
    setInput((input) => {
        return {
            ...input,
            [e.target.name] : e.target.value
        }
    })
    setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
    }))
    console.log(input)
}

function handleSelect (e) {
    setErrors(validate({
        ...input,
        temperament: [...input.temperament, e.target.value]
    }))
    if (input.temperament.includes(e.target.value)) {
        return setInput({
            ...input
        })
    }

    if (input.temperament.length < 6) {
        return setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }
    alert ("Tu nueza Raza no puede tener mas de 6 temperamentos")
    // document.getElementById('handleSelect').value="Temperament"
}

function delateTempe(el) {
    setErrors(validate({
        ...input,
        temperament: input.temperament?.filter(e => e !== el)
    }))
    setInput({
        ...input,
        temperament: input.temperament?.filter(e => e !== el)
    })
}

function handleSubmit (e) {
    e.preventDefault()
    dispatch(postDog(input))
    alert("Dog creado con Exitos!")
    // setInput({
    //     name: null,
    //     min_height: null,
    //     max_height: null, 
    //     min_weight : null,
    //     max_weight : null,
    //     life_span: null, 
    //     image: null, 
    //     temperament: []
    // })
}

function loadAgain(){
    window.location.reload()
}


return (
<div className={style.container} >
    <div className={style.containerDiv} >
    <h2 className={style.title} >Create Raza</h2>
    <form className={style.dogForm}  onSubmit={handleSubmit} >
        <div className={style.div}>
           <div className={style.inputDiv}>
            <label className={style.label} >Name</label>
            <input className={style.inputName} type="text" value={input.name} name="name" onChange={(e) => {handleInput(e)}} />
           </div>
            { errors.name && <p className={style.errors} >{errors.name}</p> }
        </div>

        <div>
           <div className={style.inputDiv} >
            <label className={style.label} >Height</label>
            <label>Min</label>
            <input className={style.input} type="number" value={input.min_height} name="min_height" min="1"  onChange={(e) => {handleInput(e)}} />
            <label>Max</label>
            <input className={style.input} type="number" value={input.max_height} name="max_height" min="1" onChange={(e) => {handleInput(e)}} />
           </div>
            { errors.height && <p className={style.errors} >{errors.height}</p> }
        </div>

        <div>
           <div className={style.inputDiv}>
            <label className={style.label} >Weight</label>
            <label>Min</label>
            <input className={style.input} type="number" value={input.min_weight} name="min_weight" min="1" max="98" onChange={(e) => {handleInput(e)}} />
            <label>Max</label>
            <input className={style.input} type="number" value={input.max_weight} name="max_weight" min="1" max="99" onChange={(e) => {handleInput(e)}} />
           </div>
            { errors.weight && <p className={style.errors} >{errors.weight}</p> }
        </div>

        <div>
           <div className={style.inputDiv} >
            <label className={style.label} >Life span</label>
            <label> ej: 3 (year)</label>
            <input className={style.input} type="number" value={input.life_span} name="life_span" min="1" onChange={(e) => {handleInput(e)}} />
           </div>
            { errors.life_span && <p className={style.errors} >{errors.life_span}</p> }
        </div>

        <div>
           <div className={style.inputDiv} >
            <label className={style.label} >Image</label>
            <input className={style.inputName} type="text" value={input.image} name="image" onChange={(e) => {handleInput(e)}} />
           </div>
            { errors.image && <p className={style.errors} >{errors.image}</p> }
        </div>

        <div>
            <div className={style.inputDiv} >
            <label className={style.label} >All Temperaments</label>
            <select className={style.inputTempe}  onChange={handleSelect} >
                <option selected={true} disabled="disabled">Temperament</option>
                {
                    alltempe?.map(e => (
                        <option key={e.id} value={e.name} >{e.name}</option>
                        ))
                    }
            </select>
            </div>
            {errors.temperament && <p className={style.errors} >{errors.temperament}</p>}
        </div>

        <div>
            <button className={style.button} type="submit" disabled={Object.keys(errors).length ? true : false} onClick={() => loadAgain()} >Crear</button>
            <Link to="/home">
                <button className={style.button} >Volver a Home</button>
            </Link>
        </div>
    </form>
    </div>

    <div className={style.theOthers}>
        <label className={style.labelSel}>Temperaments:</label>
        {
            input.temperament.length ?
            input.temperament.map(ee => (
                <div className={style.selectedTempe} key={ee} >
                    <h4 className={style.tempe} >{ee}</h4>
                    <button className={style.deleteButton} onClick={() => {delateTempe(ee)}} >x</button>
                </div>
            ))
            :
            <div className={style.placeholder} >No hay Temperament Seleccionados</div>
        }
    </div>
</div>
    )
}