import { mercadopago } from '@app/config/mercadopago.config';
import { EventService } from '@app/events/events.service';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Payment } from 'mercadopago';

@Controller('payment')
export class PaymentController {
  constructor(private readonly eventService: EventService) {}

  @Post('notification')
  async handlePaymentNotification(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const { data }: { data: { id: string } } = request.body;

      // Obtenemos el pago utilizando la ID de MercadoPago
      const payment = await new Payment(mercadopago).get({ id: data.id });

      if (payment.status === 'approved') {
        // Si el pago está aprobado, buscamos el evento por el ID de la metadata
        const eventId = payment.metadata.eventId;
        const event = await this.eventService.getEventById(eventId);

        if (event) {
          console.log(
            `Event ${event.name} has been sold with payment ID: ${payment.id}`,
          );
        } else {
          console.log(`Event with ID ${eventId} not found.`);
        }
      }

      // Respondemos con un estado 200 para confirmar que la notificación fue recibida
      response.status(200).send();
    } catch (error) {
      console.error('Error processing payment notification:', error);
      // Respondemos con un error 500 si algo salió mal
      response.status(500).send();
    }
  }
}
