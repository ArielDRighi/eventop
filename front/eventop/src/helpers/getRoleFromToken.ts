import { jwtDecode } from "jwt-decode";

export const getRoleFromToken = () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (token) {
        // Decodifica el token para obtener el payload
        const decodedToken: { role?: string } = jwtDecode(token);
        return decodedToken.role;
      }
    } catch (error) {
      console.error('Error decodificando el token:', error);
    }
    return null;
};

