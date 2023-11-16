import { GET_DOGS, GET_BY_NAME, GET_TEMPERAMENT, GET_BY_ID} from "../actions";

let initialState = { allDogs: [], allDogscopy: [], temperament: [], selectedTemperament: {}, idDog: []};

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
        allDogs: action.payload,
      };

      case GET_TEMPERAMENT:
        return {
          ...state,
          temperament: action.payload,
        };
    default:
      return state;
  }
}

export default rootReducer;