
const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: {}
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }

        case "GET_NAME_DOG":
            return {
                ...state,
                dogs: action.payload
            }
        
        case "POST_DOG":
            return {
                ...state
            }

        case "GET_DETAIL" :
            return {
                ...state,
                detail: action.payload
            }

        case "FILTER_BY_TEMPERAMENTS":
            const allTempe = state.allDogs
            const filterTempe = action.payload === "All" ? allTempe : allTempe.filter(e => e.temperament.includes(action.payload))
            return {
                ...state,
                dogs: filterTempe
            }
        
        case "FILTER_BY_CREATE":
            const alldogs = state.allDogs
            const created = action.payload === "created" ? alldogs.filter(e => e.created) : alldogs.filter(e => !e.created)
            return {
                ...state,
                dogs: action.payload === "All" ? alldogs : created
            }

        case "SORT_BY_NAME":
            const sortName = action.payload === "asc" ? 
            state.dogs.sort(function(a,b){
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0
            }) :
            state.dogs.sort(function(a,b){
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0
            })

            return {
                ...state,
                dogs: sortName
            }

        case "SORT_BY_WEIGHT":
            const sortWeight = action.payload === "min_weight" ?
            state.dogs.sort(function(a,b){
                if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                    return 1;
                  }
                  if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                    return -1;
                  }
                  return 0;
            }) :
            state.dogs.sort(function(a,b){
                if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                    return -1;
                  }
                  if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                    return 1;
                  }
                  return 0;
            })
            return{
                ...state,
                dogs: sortWeight
            }

        default:
            return state
    }
}

export default rootReducer;