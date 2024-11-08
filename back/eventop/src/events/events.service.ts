import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/events.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/CreateEvent.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getEvents(): Promise<Event[]> {
    const events = await this.eventRepository.find();
    if (!events.length) {
      throw new NotFoundException('Ocurrió un error al cargar los eventos');
    }
    return events;
  }

  async getEventById(eventId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { eventId } });
    if (!event) {
      throw new NotFoundException(`Evento con ID ${eventId} no encontrado`);
    }
    return event;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { name, description, date, price, currency, imageUrl } =
      createEventDto;

    const newEvent = this.eventRepository.create({
      name,
      description,
      date,
      price,
      currency,
      imageUrl,
    });

    const savedEvent = await this.eventRepository.save(newEvent);
    return savedEvent;
  }

  async deleteEvent(eventId: number) {
    const event = await this.getEventById(eventId);
    if (!event) {
      throw new NotFoundException(`Evento con ID ${eventId} no encontrado`);
    }
    await this.eventRepository.delete(eventId);
    return `Evento con ID ${eventId} eliminado con éxito`;
  }
}
