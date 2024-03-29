const validation = (input) => {
  let errors = {};

  // Verificar que todos los campos estén llenos
  if (!input.name) {
    errors.name = "Por favor ingrese un nombre";
  }

  if (!input.reference_image_id) {
    errors.reference_image_id = "Por favor inserte un link";
  }

  if (!input.weightMetricMin) {
    errors.weightMetricMin = "Por favor ingrese un peso en kg";
  }

  if (!input.weightMetricMax) {
    errors.weightMetricMax = "Por favor ingrese un peso en kg";
  }

  if (!input.heightMetricMin) {
    errors.heightMetricMin = "Por favor ingrese una altura en cm";
  }

  if (!input.heightMetricMax) {
    errors.heightMetricMax = "Por favor ingrese una altura en cm";
  }

  if (!input.life_spanMin) {
    errors.life_spanMin = "Por favor ingrese un tiempo de vida";
  }

  if (!input.life_spanMax) {
    errors.life_spanMax = "Por favor ingrese un tiempo de vida";
  }



  // Verificar que la reference_image_id sea un enlace válido
  if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(input.reference_image_id)) {
    errors.reference_image_id = "La reference_image_id debe ser un enlace válido";
  }

  // Verificar que heightMetricMax sea mayor a heightMetricMin
  if (input.heightMetricMin > input.heightMetricMax) {
    errors.heightMetricMin = "La altura máxima debe ser mayor a la altura mínima";
    errors.heightMetricMax = "La altura máxima debe ser mayor a la altura mínima";
  }

    // Verificar que weightMetricMax sea mayor a weightMetricMin
    if (input.weightMetricMin >= input.weightMetricMax) {
      errors.weightMetricMin = "El peso máximo debe ser mayor a el peso mínimo";
      errors.weightMetricMax = "El peso máximo debe ser mayor a el peso mínimo";
    }

    if (input.life_spanMin >= input.life_spanMax) {
      errors.life_spanMin = "El tiempo de vida mínimo debe ser menor al tiempo de vida máximo";
      errors.life_spanMax = "El tiempo de vida máximo debe ser mayor al tiempo de vida mínimo";
    }
      
   // Verificar que sean números enteros
   if (!Number.isInteger(Number(input.life_spanMin))) {
    errors.life_spanMin = "Por favor ingrese un número entero para el peso mínimo";
  }
  if (!Number.isInteger(Number(input.life_spanMax))) {
    errors.life_spanMax = "Por favor ingrese un número entero para el peso mínimo";
  }
  if (!Number.isInteger(Number(input.weightMetricMin))) {
    errors.weightMetricMin = "Por favor ingrese un número entero para el peso mínimo";
  }
  if (!Number.isInteger(Number(input.weightMetricMax))) {
    errors.weightMetricMax = "Por favor ingrese un número entero para el peso máximo";
  }
  if (!Number.isInteger(Number(input.heightMetricMin))) {
    errors.heightMetricMin = "Por favor ingrese un número entero para la altura mínimo";
  }

  if (!Number.isInteger(Number(input.heightMetricMax))) {
    errors.heightMetricMax = "Por favor ingrese un número entero para la altura máximo";
  }


  const nameRegex = /^[a-zA-Z\s]{4,20}$/;
  if (!nameRegex.test(input.name)) {
    errors.name = "Por favor ingrese un nombre válido sin números y no superior a 20 caracteres";
  }




  return errors;
};

export default validation;
