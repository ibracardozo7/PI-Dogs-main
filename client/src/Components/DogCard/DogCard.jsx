import React from "react";
import { Link } from "react-router-dom";
import style from "./DogCard.module.css"

export default function DogCard ({name, image, temperament, weight, id}) {
    // console.log({name, image, temperament, weight, id})
    return (
        <div className={style.container}>
            <h2 className={style.name}>{name}</h2>
            <Link to={`/dog/${id}`} >
            <div>
                <img className={style.image} src={image} />
            </div>
            </Link>
            {/* <h3>{weight[0] + " - "+ weight[1]}</h3> */}
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
                    temperament.join(" - ")
                }
            </div>
        </div>
    )
}