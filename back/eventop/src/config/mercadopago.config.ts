import MercadoPagoConfig from 'mercadopago';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});
