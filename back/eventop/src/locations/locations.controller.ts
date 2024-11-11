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
import { LocationService } from './locations.service';
import { CreateLocationDto } from './dto/CreateLocation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getLocations() {
    try {
      return await this.locationService.getLocations();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getLocationById(@Param('id') locationId: number) {
    try {
      return await this.locationService.getLocationById(locationId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createLocation(@Body() createLocationDto: CreateLocationDto) {
    try {
      return await this.locationService.createLocation(createLocationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteLocation(@Param('id') locationId: number) {
    try {
      return await this.locationService.deleteLocation(locationId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
