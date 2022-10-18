import React from "react";
import {Link} from "react-router-dom";
import style from "./LandingPage.module.css"

export default function LandingPage() {
    return(
        <div className={style.container}>
            <h3 className={style.welcome}>
            welcome to dog project!
            </h3>
            <Link to="/home">
                <button className={style.botton} >Inicio</button>
            </Link>
        </div>
    )
}