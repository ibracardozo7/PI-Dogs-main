import React, {useEffect, Fragment } from "react";
import {useDispatch, useSelector,} from "react-redux";
import { Link, useParams } from "react-router-dom";
import {getDetail, vaciarDetail} from "../../Redux/action"
import style from "./DogDetail.module.css"
// import loading from "../../Img/loading.gif"
// import loading1 from "../../Img/loading1.gif"


export default function DogDetail (props) {
// console.log(props)
const dispatch = useDispatch()

const detail = useSelector(state => state.detail)
const {id} = useParams()
// console.log(detail)

function volver () {
    dispatch(vaciarDetail())
}
useEffect(() => {
    dispatch(getDetail(id))
    // .then((data) => {
    //     setDetail(data.payload)
    //     console.log("-----------------------",data.payload)
    // })
    // return () => {
    //     detail= null    
    // }
},[])

// const tempe = detail.map(e => (
//     <h4 className={style.labelTempe} key={e} >{e}</h4>
//     ))

    return (
        <div>
            <div className={style.containerNav}>
                <h5 className={style.Detail} >Detalle de raza</h5>
                <Link to="/home">
                    <button onClick={volver} className={style.boton} >Volver</button>
                </Link>
            </div>
            {
                detail.message ? 
                <div className={style.dog}>
                    <p className={style.dogname} >{detail.message}</p> 
                </div>
                :
                <Fragment>
            {
                
                detail.image ?
                <div className={style.containerMain}>
                    <div className={style.mainComponent} >
                        <div className={style.container}>
                        <h2 className={style.nameDetail} >{detail.name}</h2>
                        <img className={style.image} src={detail.image} alt="Error" />
                        <div className={style.statTempe}>
                            <div className={style.label}>  Temperaments:</div>
                            <div className={style.losTempe}>
                            {/* { detail.temperament?.map(e => (
                                <h4 className={style.labelTempe} key={e} >{e}</h4>
                                ))
                                :
                                <
                            } */}

                            {
                                detail.temperament.length ? detail.temperament.map(e => (
                                    <h4 className={style.labelTempe} key={e} >{e}</h4>
                                    )) :
                                <h4>No tiene temperamento</h4>
                            }
                            </div>
                        </div>
                        <div className={style.stat}>
                            <label className={style.label} >Altura:</label>
                            <div className={style.statValue} >{`${detail.height &&detail.height[0]} - ${detail.height && detail.height[1]} CM`}</div>
                        </div>
                        <div className={style.stat}>
                            <label className={style.label} >Peso:</label>
                            <div className={style.statValue} >{`${detail.weight &&detail.weight[0]} - ${detail.weight && detail.weight[1]} KG`}</div>
                        </div>
                        <div className={style.stat}>
                            <label className={style.label} >Año de vida:</label>
                            <div className={style.statValue} >{detail.life_span}</div>
                        </div>
                        </div>
                    </div>
                </div>

                :

                <div className={style.loading} >
                    {/* <p>Loading</p> */}
                    {/* <img src={loading} alt="loading..." /> */}
                    {/* <img src={loading1} alt="loading..." /> */}
                </div>
            }
            </Fragment>
            }

            
            
        </div>
    )
}