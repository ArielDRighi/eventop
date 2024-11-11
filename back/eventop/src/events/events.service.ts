import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/events.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/categories.entity';
import { Location } from 'src/locations/entities/locations.entity';
import { CreateEventDto } from './dto/CreateEvent.dto';

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
      relations: { location_id: true, category_id: true },
    });
    if (!events.length) {
      throw new NotFoundException('No events found');
    }
    return events;
  }

  async getEventById(eventId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { eventId },
      relations: { location_id: true, category_id: true },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
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
      location_id,
      imageUrl,
      category_id,
    } = createEventDto;

    const location = await this.locationRepository.findOne({
      where: { locationId: location_id },
    });
    if (!location) {
      throw new Error(`Locación con ID ${location_id} no encontrada`);
    }

    const category = await this.categoryRepository.findOne({
      where: { categoryId: category_id },
    });
    if (!category) {
      throw new Error(`Categoria con ID ${category_id} no encontrada`);
    }

    const newEvent = this.eventRepository.create({
      name,
      description,
      date,
      price,
      currency,
      location_id,
      imageUrl,
      category_id,
    });

    const savedEvent = await this.eventRepository.save(newEvent);
    return savedEvent;
  }

  async deleteEvent(eventId: number) {
    const event = await this.getEventById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    try {
      await this.eventRepository.remove(event);
    } catch (error) {
      throw new BadRequestException('Failed to delete event');
    }
  }
}
