// validateRegisterForm.ts
import { IRegisterProps, IRegisterErrors } from "@/interfaces/IRegisterProps";

const validateRegisterForm = (values: IRegisterProps): IRegisterErrors => {
  const errors: IRegisterErrors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };


  // Validación para el nombre (no vacío)
  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  // Validación para el email
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address.";
  }

  
  // Validación para la contraseña
  if (!values.password.trim()) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+\-=\[\]{};':"\\|,.<>/?]).+$/.test(values.password)) {
    errors.password = "Password must include at least one uppercase letter, one number, and one special character.";
  }
  
  

  // Validación para confirmar que las contraseñas coinciden
  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }


  return errors;
};

export default validateRegisterForm;
