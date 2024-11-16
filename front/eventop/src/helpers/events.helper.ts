import { IEvents, IEventsCreate } from "@/interfaces/IEventos";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const createEvent = async (data: IEventsCreate, token: any, image: File | null) => {
  try {
    const { access_token } = token;
    console.log(access_token);

    // Crear un FormData y agregar los datos y la imagen
    const formData = new FormData();
    formData.append('data', JSON.stringify(data)); // Agregar los datos como string
    formData.append('image', image); // Agregar la imagen como archivo

    const response = await fetch(`${APIURL}/events/create`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${access_token}`,
        // No se debe especificar "Content-Type" con FormData, ya que lo hace automáticamente
      },
      body: formData
    });
    const res = await response.json();
    if (res.status === 201) {
      Swal.fire({
        title: "Evento creado",
        text: "Gracias por unirte a nosotros",
        icon: "success",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-[#164E78] hover:bg-[#169978] text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
    }
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const useGetAllEvents  = async () => {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${APIURL}/events`, {
          method: "GET"
        })
        const data = await res.json()
         setResult(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
      }
    })();
  }, []);
  
  return { result, loading, error };
};
