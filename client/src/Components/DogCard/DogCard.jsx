import React from "react";
import { Link } from "react-router-dom";
import style from "./DogCard.module.css"

export default function DogCard ({name, image, temperament, weight, id}) {
    // console.log({name, image, temperament, weight, id})

    const tempe = temperament.join(" - ")
    return (
        <div className={style.container}>
            <h2 className={style.name}>{name}</h2>
            <div>
            <Link to={`/dog/${id}`} >
                <img className={style.image} src={image} alt="img dog" />
                </Link>
            </div>
            <div className={style.temperaments}>
                {/* {
                    temperament.map((e) => {
                        return (
                            <h4 key={e} className={style.tempe} >{e}</h4>
                            )
                        }
                        )
                    } */}
                {/* <p>Temperament</p> */}
                {
                    
                    temperament.length ? tempe : 
                    <p>No tiene temperamentos</p> 
                    
                }
            </div>
            <h4>{`Weight :  ${weight[0]} - ${weight[1]}  Kg`}</h4>
        </div>
    )
}