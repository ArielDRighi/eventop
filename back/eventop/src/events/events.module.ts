import { Module } from '@nestjs/common';
import EventController from './events.controller';
import { EventService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entitie/events.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService, CloudinaryConfig, CloudinaryService],
})
export class EventsModule {}
