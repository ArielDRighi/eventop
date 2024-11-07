import { Category } from 'src/categories/entitie/categories.entity';
import { Location } from 'src/locations/entitie/locations.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn({ name: 'event_id' })
  eventId: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @ManyToOne(() => Location, (location) => location.events)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToOne(() => Category, (category) => category.events)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
