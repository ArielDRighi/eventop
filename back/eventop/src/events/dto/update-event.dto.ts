import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({
    type: String,
    description: 'The name of the event',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'The description of the event',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Date,
    description: 'The date of the event',
    required: true,
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    type: Number,
    description: 'The price of the event',
    required: true,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
    description: 'The categoryId of the event',
    required: true,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    type: String,
    description: 'The locationId of the event',
    required: true,
  })
  @IsNumber()
  locationId: number;
}
