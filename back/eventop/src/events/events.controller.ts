import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/CreateEvent.dto';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Multer from 'multer';

@Controller('events')
export default class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  //   Rutas

  @Get()
  @HttpCode(HttpStatus.OK)
  getEvents() {
    const events = this.eventService.getEvents();
    return events;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getEventById(@Param('id') eventId: number) {
    const event = this.eventService.getEventById(eventId);
    return event;
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createEvent(
    @Body() body: any, // Lo recibimos como 'any' para manejar el texto JSON.
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Parseamos el campo body que contiene el JSON.
    const createEventDto: CreateEventDto = JSON.parse(body);

    // Subimos la imagen a Cloudinary y obtenemos la URL
    const imageUrl = await this.cloudinaryService.uploadImage(file);

    // Creamos el evento
    const event = {
      ...createEventDto,
      imageUrl,
    };

    // Guardamos el evento en la base de datos
    const eventCreated = await this.eventService.createEvent(event);

    return { message: 'Evento creado exitosamente', eventCreated };
  }

  @Delete('id')
  deleteEvent(@Param('id') eventId: number) {
    return this.eventService.deleteEvent(eventId);
  }
}
