// validateRegisterForm.ts
import { IRegisterProps, IRegisterErrors } from "@/interfaces/IRegisterProps";

const validateRegisterForm = (values: IRegisterProps): IRegisterErrors => {
  const errors: IRegisterErrors = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
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
  }

  // Validación para la dirección
  if (!values.address.trim()) {
    errors.address = "Address is required.";
  }

  // Validación para el teléfono
  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d{10,15}$/.test(values.phone)) {
    errors.phone = "Phone number must be between 10 and 15 digits.";
  }

  return errors;
};

export default validateRegisterForm;
