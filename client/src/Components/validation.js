const validation = (input) => {
  let errors={}
 
    // Verificar que todos los campos estén llenos
    if (!input.name) {
      errors.name = "Por favor ingrese un nombre";
    }

        
    if (!input.weightMetric) {
      errors.weightMetric = "Por favor ingrese un peso en kg";
    }

    if (!input.weightImperial) {
      errors.weightImperial = "Por favor ingrese un peso en lb";
    }
  
    if (!input.heightImperial) {
      errors.heightImperial = "Por favor ingrese una altura en pies";
    }
    if (!input.heightMetric) {
      errors.heightMetric = "Por favor ingrese una altura en cm";
    }
  
    if (!input.life_span) {
      errors.life_span = "Por favor ingrese un tiempo de vida";
    }
  
    if (!input.temperament) {
      errors.teams = "Por favor seleccione un temperamento";
    }
    if (!input.reference_image_id) {
      errors.reference_image_id = "Por favor inserte un link";
    }
  
    // Otras verificaciones
  

  
    // Verificar que la  reference_image_id sea un enlace válido
    if (
      !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(input. reference_image_id)) {
      errors.reference_image_id= "La  reference_image_id debe ser un enlace válido";
    }

  
    return errors;
  };
  
  export default validation;
  

  
  

