import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Location } from './entities/locations.entity';
import { CreateLocationDto } from './dto/CreateLocation.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getLocations(): Promise<Location[]> {
    const locations = await this.locationRepository.find();
    if (!locations.length) {
      throw new NotFoundException('Ocurrió un error al cargar las locaciones');
    }
    return locations;
  }

  async getLocationById(locationId): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { locationId },
    });
    if (!location) {
      throw new NotFoundException(
        `Locación con ID ${locationId} no encontrada`,
      );
    }
    return location;
  }

  async createLocation(createLocationDto): Promise<Location> {
    const { city, state, country, address, latitude, longitude } =
      createLocationDto;

    const newLocation = this.locationRepository.create({
      city,
      state,
      country,
      address,
      latitude,
      longitude,
    });
    const savedLocation = await this.locationRepository.save(newLocation);
    return newLocation;
  }

  async deleteLocation(locationId: number) {
    const location = await this.getLocationById(locationId);
    if (!location) {
      throw new NotFoundException(
        `Locación con ID ${locationId} no encontrada`,
      );
    }
    await this.locationRepository.delete(locationId);
    return `Locación con ID${locationId} eliminada con éxito!`;
  }
}
