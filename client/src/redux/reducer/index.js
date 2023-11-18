import { GET_DOGS, GET_BY_NAME, GET_TEMPERAMENT, GET_BY_ID, ORDER, FILTER_BY_TEMP, FILTER_BY_LIFESPAN, FILTER_BY_ORIGIN } from "../actions";

let initialState = {
  allDogs: [], allDogscopy: [], temperament: [], idDog: [],
  orderAndFilter: { order: 'A', temperamentFilter: 'All', originFilter: 'all' }
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        allDogscopy: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        idDog: action.payload
      }
    case GET_BY_NAME:
      return {
        ...state,
        dogsName: action.payload
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
        let filteredDogs = state.allDogs.filter((dog) => dog?.temperament?.includes(action.payload))
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
             filteredDogs = state.allDogs.filter((dog)=> typeof(dog?.id)==='number')}
          else if (action.payload === 'Created'){
            filteredDogs = state.allDogs.filter((dog)=> typeof(dog?.id)==='string')
          }
          state.allDogs.filter((dog) => dog?.temperament?.includes(action.payload))
          return {
            ...state,
            allDogs: filteredDogs,
            orderAndFilter: {
              ...state.orderAndFilter,
              originFilter: action.payload,
            }
          }

        }
    default:
      return state;
  }
}

export default rootReducer;