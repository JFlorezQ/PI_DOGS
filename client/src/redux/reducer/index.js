import { GET_DOGS, GET_BY_NAME, GET_TEMPERAMENT, GET_BY_ID, ORDER, FILTER_BY_TEMP, FILTER_BY_LIFESPAN, FILTER_BY_ORIGIN} from "../actions";

let initialState = { allDogs: [], allDogscopy: [], temperament: [], idDog: [],
                     orderAndFilter :{ order: 'A', temperamentFilter: 'All', originFilter: 'all'}};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        allDogscopy: action.payload,
      };
    case GET_BY_ID:
      return{
        ...state,
        idDog: action.payload
      }
    case GET_BY_NAME:
      return {
        ...state,
        dogsName: action.payload,
      };

      case GET_TEMPERAMENT:
        return {
          ...state,
          temperament: action.payload,
        };
    case ORDER:
      let orderedDogs = [...state.allDogs]
      let orderedDogsCopy = [...state.allDogscopy]

      switch (action.payload){
        case "A":
          orderedDogs?.sort((a,b)=> a.name.localeCompare(b.name))
          break;
        case "D":
          orderedDogs?.sort((a,b)=> b.name.localeCompare(a.name))
          break;
        

      }
      return {
        ...state, 
        allDogs: orderedDogs,
        allDogscopy: orderedDogsCopy,
        orderAndFilter:{
            ...state.orderAndFilter,
            order: action.payload ? action.payload : 'A',
        },
    }
    default:
      return state;
  }
}

export default rootReducer;