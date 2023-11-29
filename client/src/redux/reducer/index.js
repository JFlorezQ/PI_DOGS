import { GET_DOGS, GET_BY_NAME, GET_TEMPERAMENT, GET_BY_ID, ORDER, FILTER_BY_TEMP, FILTER_BY_ORIGIN, POST_DOG_SUCCESS, POST_DOG_FAILURE } from "../actions";

let initialState = {
  allDogs: [], allDogscopy: [], temperament: [], idDog: [],
  orderAndFilter: { order: 'A', temperamentFilter: 'All', originFilter: 'all', pagination: 1}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        allDogscopy: action.payload,
        orderAndFilter: { order: 'A', temperamentFilter: 'All', originFilter: 'all' }
      };
    case GET_BY_ID:
      return {
        ...state,
        idDog: action.payload
      }
    case GET_BY_NAME:
      
        if(action.payload === ""){
          return {...state}}
        else{
          return{...state,
        allDogs: action.payload,
        orderAndFilter: { order: 'A', temperamentFilter: 'All', originFilter: 'all' }}
      };

    case GET_TEMPERAMENT:
      return {
        ...state,
        temperament: action.payload,
      };
    case ORDER:
      let orderedDogs = [...state.allDogs]
      let orderedDogsCopy = [...state.allDogscopy]

      switch (action.payload) {
        case "A":
          orderedDogs?.sort((a, b) => a.name.localeCompare(b.name))
          break;
        case "Z":
          orderedDogs?.sort((a, b) => b.name.localeCompare(a.name))
          break;
        case "minweight":
          orderedDogs?.sort((a, b) => {
            let pesoA;
            let pesoB;
            if (!a.weightMetric) {
              pesoA = a.weightMetric?.split(' ')
              console.log(pesoA)
              pesoA = pesoA[0]
            } else {
              pesoA = a.weightMetric?.split(' ');
              pesoA = pesoA[0]
            }
            if (!b.weightMetric) {
              pesoB = a.weightMetric?.split(' ')
              console.log(pesoB)
              pesoB = pesoB[0]
            } else {
              pesoB = b.weightMetric?.split(' ');
              pesoB = pesoB[0]
            }
            return parseInt(pesoA) - parseInt(pesoB)
          })

          break;
          case "maxweight":
            orderedDogs?.sort((a, b) => {
              let pesoA;
              let pesoB;
              if (!a.weightMetric) {
                pesoA = a.weightMetric?.split(' ')
                console.log(pesoA)
                pesoA = pesoA[0]
              } else {
                pesoA = a.weightMetric?.split(' ');
                pesoA = pesoA[0]
              }
              if (!b.weightMetric) {
                pesoB = a.weightMetric?.split(' ')
                console.log(pesoB)
                pesoB = pesoB[0]
              } else {
                pesoB = b.weightMetric?.split(' ');
                pesoB = pesoB[0]
              }
              return parseInt(pesoB) - parseInt(pesoA)
            })
  
            break;
      }
      return {
        ...state,
        allDogs: orderedDogs,
        allDogscopy: orderedDogsCopy,
        orderAndFilter: {
          ...state.orderAndFilter,
          order: action.payload ? action.payload : 'A',
        },
      }
    case FILTER_BY_TEMP:
      if (action.payload === "All") {
        return {
          ...state,
          allDogs: state.allDogscopy,
          orderAndFilter: {
            ...state.orderAndFilter,
            temperamentFilter: 'All'
          }
        }
      } else {
        let filteredDogs = state.allDogscopy.filter((dog) => dog?.temperament?.includes(action.payload))
        return {
          ...state,
          allDogs: filteredDogs,
          orderAndFilter: {
            ...state.orderAndFilter,
            temperamentFilter: action.payload,
          }
        }

      }
      case FILTER_BY_ORIGIN:
        if (action.payload === "All") {
          return {
            ...state,
            allDogs: state.allDogscopy,
            orderAndFilter: {
              ...state.orderAndFilter,
              originFilter: 'All'

            }
          }
        } else {
          let filteredDogs = []
          if (action.payload === 'Api'){
             filteredDogs = state.allDogscopy.filter((dog)=> typeof(dog?.id)==='number')}
          else if (action.payload === 'Created'){
            filteredDogs = state.allDogscopy.filter((dog)=> typeof(dog?.id)==='string')
          }
          
          return {
            ...state,
            allDogs: filteredDogs,
            orderAndFilter: {
              ...state.orderAndFilter,
              originFilter: action.payload,
            }
          }

        }
        case POST_DOG_SUCCESS:
          // Manejar el éxito de la creación de un perro
          return {
            ...state,
            allDogs: [...state.allDogs, action.payload],
            allDogscopy: [...state.allDogscopy, action.payload],
          };
    
        case POST_DOG_FAILURE:
          // Manejar el fallo de la creación de un perro
          console.error("Error en la solicitud POST:", action.payload);
          // Puedes querer actualizar el estado con un mensaje de error
          return state;
    
        default:
          return state;
      }
}

export default rootReducer;