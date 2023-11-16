import axios from "axios"

export const GET_DOGS = 'GET_DOGS'
export const GET_BY_ID = 'GET_BY_ID'
export const GET_BY_NAME = 'GET_BY_NAME'
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT'
export const GET_SELECTED = 'GET_SELECTED'

export function getDogs() {
  return async function (dispatch) {
    const response = await axios('http://localhost:1030/dogs')
    return dispatch({
      type: "GET_DOGS",
      payload: response.data
    })
  }
}

export function getbyID(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:1030/dogs/${id}`);

      dispatch({
        type: "GET_BY_ID_SUCCESS",
        payload: response.data
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);}}}

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


export function postDog(input) {
  return async function (dispatch) {
    try {
      const url = `http://localhost:1030/dogs`;
      await axios.post(url, input);
      console.log(`Solicitud POST realizada a: ${url}`);
      console.log(input)
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
    }
  };
}