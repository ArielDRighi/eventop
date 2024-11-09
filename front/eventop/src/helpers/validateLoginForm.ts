import { ILoginProps, ILoginErrors } from "@/interfaces/ILoginProps"


  const validateLoginForm = (data: ILoginProps): ILoginErrors => {
    const errors: ILoginErrors = {};
    let isValid = true;
  
    // Validar el email
    if (!data.email) {
      errors.email = 'El email es requerido.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'El email no es válido.';
      isValid = false;
    }
  
    // Validar la contraseña
    if (!data.password) {
      errors.password = 'La contraseña es requerida.';
      isValid = false;
    } else if (data.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
      isValid = false;
    }
  
    return errors
  };

export default validateLoginForm