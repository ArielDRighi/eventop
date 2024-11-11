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
  @UseInterceptors(FileInterceptor('image'))
  async createEvent(
    @Body('data') data: any, // Lo recibimos como 'any' para manejar el texto JSON.
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      // Parseamos el campo body que contiene el JSON.
      const createEventDto: CreateEventDto = JSON.parse(data);

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
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteEvent(@Param('id') eventId: number) {
    try {
      return await this.eventService.deleteEvent(eventId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
