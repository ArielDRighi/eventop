import React, { useState, useEffect } from "react";
import { Wallet } from "@mercadopago/sdk-react";

const App: React.FC = () => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const eventId = 1; // Reemplaza con el ID del evento que deseas pagar

  useEffect(() => {
    const createPreference = async () => {
      const response = await fetch("/payment/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      });
      const data = await response.json();
      setPreferenceId(data.preferenceId);
    };

    createPreference();
  }, [eventId]);

  return (
    <div className="bg-gray-900">
      <div id="wallet_container">
        {preferenceId ? (
          <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: "smart_option" } }} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
