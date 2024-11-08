import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/CreateEvent.dto';

@Controller('events')
export default class EventController {
  constructor(private readonly eventService: EventService) {}

  //   Rutas

  @Get()
  @HttpCode(HttpStatus.OK)
  getEvents() {
    const events = this.eventService.getEvents();
    return events;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCategoryById(@Param('id') eventId: number) {
    const event = this.eventService.getEventById(eventId);
    return event;
  }

  @Post('create')
  createCategory(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') eventId: number) {
    return this.eventService.deleteEvent(eventId);
  }
}
