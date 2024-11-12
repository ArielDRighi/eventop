import { Module } from '@nestjs/common';
import { EventController } from './events.controller';
import { EventService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/events.entity';
import { CloudinaryService } from './cloudinary.service';
import { Category } from 'src/categories/entities/categories.entity';
import { Location } from 'src/locations/entities/locations.entity';
import { PaymentController } from './payment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Location, Category])],
  controllers: [EventController, PaymentController],
  providers: [EventService, CloudinaryService],
})
export class EventsModule {}
