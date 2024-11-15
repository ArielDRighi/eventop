import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getRoleFromToken = () => {
    try {
      const token = Cookies.get("adminToken");
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

