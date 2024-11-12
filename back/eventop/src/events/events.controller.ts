import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  HttpException,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/CreateEvent.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags, ApiBody } from '@nestjs/swagger';
import { Roles } from '@app/decorators/roles.decorator';
import { Role } from '@app/auth/enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '@app/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@ApiTags('events')
@ApiBearerAuth('access-token')
@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        date: { type: 'string', format: 'date' },
        price: { type: 'number' },
        category_id: { type: 'number' },
        location_id: { type: 'number' },
        currency: { type: 'string' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      const event = {
        ...createEventDto,
        imageUrl,
      };
      const eventCreated = await this.eventService.createEvent(event);
      return { message: 'Evento creado exitosamente', eventCreated };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateEvent(
    @Param('id') eventId: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    try {
      return await this.eventService.updateEvent(eventId, updateEventDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteEvent(@Param('id') eventId: number) {
    try {
      return await this.eventService.deleteEvent(eventId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
