import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
      throw new NotFoundException('No events found');
    }
    return events;
  }

  async getEventById(eventId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { eventId },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    return event;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { name } = createEventDto;
    const newEvent = this.eventRepository.create({ name });
    try {
      const savedEvent = await this.eventRepository.save(newEvent);
      return savedEvent;
    } catch (error) {
      throw new BadRequestException('Failed to create event');
    }
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
