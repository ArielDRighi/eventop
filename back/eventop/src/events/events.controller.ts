import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/CreateEvent.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export default class EventController {
  constructor(private readonly eventService: EventService) {}

  // Rutas

  @Get()
  @HttpCode(HttpStatus.OK)
  async getEvents() {
    try {
      return await this.eventService.getEvents();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getEventById(@Param('id') eventId: number) {
    try {
      return await this.eventService.getEventById(eventId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createEvent(@Body() createEventDto: CreateEventDto) {
    try {
      return await this.eventService.createEvent(createEventDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvent(@Param('id') eventId: number) {
    try {
      return await this.eventService.deleteEvent(eventId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
