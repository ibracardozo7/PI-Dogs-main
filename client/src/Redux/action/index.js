import axios from "axios"

export function getDogs () {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/dogs")
            return dispatch({
                type: "GET_DOGS",
                payload: json.data
            })   
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTemperaments () {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/temperaments")
            return dispatch({
                type: "GET_TEMPERAMENTS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getNameDog (name) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/dogs?name=" + name)
            // console.log(json)
            return dispatch ({
                type: "GET_NAME_DOG",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
            alert("Dog no encontrado")
        }
    }
}

export function postDog (payload) {
    return async function (dispatch) {
        try {
            let json = await axios.post("http://localhost:3001/dogs", payload)
            console.log(json)
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetail (id) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/dogs/" + id)
            console.log(json)
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data[0]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterByTemperaments (payload) {
    return {
        type: "FILTER_BY_TEMPERAMENTS",
        payload
    }
}

export function filterByCreate (payload){
    return {
        type: "FILTER_BY_CREATE",
        payload
    }
}

export function sortByName (payload) {
    return {
        type: "SORT_BY_NAME",
        payload
    }
}

export function sortByWeight (payload) {
    return {
        type: "SORT_BY_WEIGHT",
        payload
    }
}