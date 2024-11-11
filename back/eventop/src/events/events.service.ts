import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entitie/events.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entitie/categories.entity';
import { Location } from 'src/locations/entitie/locations.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getEvents(): Promise<Event[]> {
    const events = await this.eventRepository.find({
      relations: { location: true, category: true },
    });
    if (!events.length) {
      throw new NotFoundException('Ocurrió un error al cargar los eventos');
    }
    return events;
  }

  async getEventById(eventId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { eventId },
      relations: { location: true, category: true },
    });
    if (!event) {
      throw new NotFoundException(`Evento con ID ${eventId} no encontrado`);
    }
    return event;
  }

  async createEvent(createEventDto): Promise<Event> {
    const {
      name,
      description,
      date,
      price,
      currency,
      locationId,
      imageUrl,
      categoryId,
    } = createEventDto;

    const location = await this.locationRepository.findOne({
      where: { locationId },
    });
    if (!location) {
      throw new Error(`Locación con ID ${locationId} no encontrada`);
    }

    const category = await this.categoryRepository.findOne({
      where: { categoryId },
    });
    if (!category) {
      throw new Error(`Categoria con ID ${locationId} no encontrada`);
    }

    const newEvent = this.eventRepository.create({
      name,
      description,
      date,
      price,
      currency,
      location,
      imageUrl,
      category,
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
