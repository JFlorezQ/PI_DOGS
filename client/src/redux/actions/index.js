import axios from "axios"

export const GET_DOGS = 'GET_DOGS'
export const GET_BY_ID = 'GET_BY_ID'
export const GET_BY_NAME = 'GET_BY_NAME'
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT'
export const ORDER = 'ORDER'
export const FILTER_BY_TEMP = 'FILTER_BY_TEMP'
// export const CLEAR_DOGS = 'CLEAR_DOG'
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'
export const  POST_DOG_FAILURE = 'POST_DOG_FAILURE'
export const POST_DOG_SUCCESS = 'POST_DOG_SUCCESS'

export function getDogs() {
  return async function (dispatch) {
    const response = await axios('http://localhost:1030/dogs')
    return dispatch({
      type: GET_DOGS,
      payload: response.data
    })
  }
}

export function getbyID(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:1030/dogs/${id}`);

      dispatch({
        type: GET_BY_ID,
        payload: response.data
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }
}

export function getbyName(name) {
  return async function (dispatch) {
    try {
      const url = `http://localhost:1030/dogs/search/name?name=${name}`;
      const response = await axios(url);
      console.log(`Solicitud GET realizada a: ${url}`);
      console.log("Respuesta del servidor:", response.data);
      dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
}

export function gettemperament() {
  return async function (dispatch) {
    try {
      const url = `http://localhost:1030/temperaments`;
      const response = await axios(url);

      dispatch({
        type: GET_TEMPERAMENT,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
}


export function orderDogs(order) {
  return function (dispatch) {
    dispatch({
      type: ORDER,
      payload: order,
    });
  };
}

export function filterbyTemp(temperament) {
  return function (dispatch) {
    dispatch({
      type: FILTER_BY_TEMP,
      payload: temperament,
    });
  };
}


export function filterbyOrigin(created) {
  return function (dispatch) {
    dispatch({
      type: FILTER_BY_ORIGIN,
      payload: created,
    });
  };
}
export function postDog(input) {
  return async function (dispatch) {
    try {
      const url = `http://localhost:1030/dogs`;
      const response = await axios.post(url, input);
      
      // Verificar si la solicitud POST fue exitosa
      if (response.status === 201) {
        console.log(`Solicitud POST exitosa a: ${url}`);
        console.log(response.data); // Aquí puedes hacer algo con la respuesta del servidor si es necesario

        // Despachar una acción indicando que la creación fue exitosa
        dispatch({
          type: POST_DOG_SUCCESS,
          payload: response.data,
        });
      } else {
        console.error(`Error en la solicitud POST a: ${url}`);
        console.error(response.data); // Aquí puedes hacer algo con la respuesta de error si es necesario

        // Despachar una acción indicando que la creación falló
        dispatch({
          type: POST_DOG_FAILURE,
          payload: response.data,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);

      // Despachar una acción indicando que la creación falló
      dispatch({
        type: POST_DOG_FAILURE,
        payload: error.message,
      });
    }
  };
}
