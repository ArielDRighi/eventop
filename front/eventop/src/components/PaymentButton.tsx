import React, { useEffect } from "react";
import { MercadoPago } from "@mercadopago/sdk-react";

interface PaymentButtonProps {
  preferenceId: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ preferenceId }) => {
  useEffect(() => {
    const mp = new MercadoPago("YOUR_PUBLIC_KEY");
    const bricksBuilder = mp.bricks();

    bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
      customization: {
        texts: {
          valueProp: "smart_option",
        },
      },
    });
  }, [preferenceId]);

  return <div id="wallet_container" />;
};

export default PaymentButton;
