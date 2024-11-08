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
import { LocationService } from './locations.service';
import { CreateLocationDto } from './dto/CreateLocation.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // Rutas

  @Get()
  @HttpCode(HttpStatus.OK)
  getLocations() {
    const locations = this.locationService.getLocations();
    return locations;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getLocationById(@Param('id') locationId: number) {
    const location = this.locationService.getLocationById(locationId);
    return location;
  }

  @Post('create')
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }

  @Delete(':id')
  deleteLocation(@Param('id') locationId: number) {
    return this.locationService.deleteLocation(locationId);
  }
}
