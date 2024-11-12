import { Injectable, NotFoundException } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/events.entity';
import { EventService } from './events.service';

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly eventService: EventService,
  ) {}

  async createPreference(eventId: number) {
    const event = await this.eventService.getEventById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    const preference = new Preference(client);

    try {
      const response = await preference.create({
        body: {
          items: [
            {
              title: event.name,
              description: event.description,
              quantity: 1,
              unit_price: event.price,
              id: event.eventId.toString(),
            },
          ],
          payer: {
            email: 'payer_email@example.com', // Puedes obtener el email del comprador si está disponible
          },
          back_urls: {
            success: 'https://www.tu-sitio.com/success',
            failure: 'https://www.tu-sitio.com/failure',
            pending: 'https://www.tu-sitio.com/pending',
          },
          auto_return: 'approved',
        },
      });
      console.log(response);
      return response.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
