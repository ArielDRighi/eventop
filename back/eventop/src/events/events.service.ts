import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/events.entity';
import { CreateEventDto } from './dto/CreateEvent.dto';
import { UpdateEventDto } from './dto/update-event.dto';

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
      throw new HttpException(
        `Event with ID ${eventId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return event;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = this.eventRepository.create(createEventDto);
    try {
      return await this.eventRepository.save(newEvent);
    } catch (error) {
      throw new HttpException('Failed to create event', HttpStatus.BAD_REQUEST);
    }
  }

  async updateEvent(
    eventId: number,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { eventId } });

    if (!event) {
      throw new HttpException(
        `Evento con ID ${eventId} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(event, updateEventDto);

    try {
      return await this.eventRepository.save(event);
    } catch (error) {
      throw new HttpException('Failed to update event', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteEvent(eventId: number): Promise<{ message: string }> {
    const event = await this.getEventById(eventId);
    if (!event) {
      throw new HttpException(
        `Event with ID ${eventId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this.eventRepository.remove(event);
      return { message: 'Event deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete event', HttpStatus.BAD_REQUEST);
    }
  }
}
