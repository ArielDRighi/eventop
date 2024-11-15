"use client";

import React, { useState, useEffect } from "react";
import PaymentButton from "./PaymentButton";

const App: React.FC = () => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const eventId = 1; // Reemplaza con el ID del evento que deseas pagar

  useEffect(() => {
    const createPreference = async () => {
      console.log("ID de evento:", eventId);

      try {
        console.log("Bloque try");

        const response = await fetch(
          "http://localhost:3000/payment/create_preference",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId }),
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            console.error(
              "Error 404: URL no encontrada - /payment/create_preference"
            );
          } else if (response.status === 500) {
            console.error("Error 500: Internal Server Error");
          }
          throw new Error(
            `HTTP error! status: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        setPreferenceId(data.preferenceId);
      } catch (error) {
        console.error("Error creating preference:", error);
      }
    };

    createPreference();
  }, [eventId]);

  return (
    <div>
      {preferenceId ? (
        <PaymentButton preferenceId={preferenceId} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
