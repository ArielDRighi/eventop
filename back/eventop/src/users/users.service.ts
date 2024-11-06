import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Servicios

  //   Retornar usuario por Email
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  //   Crear usuario
  async createUser(user: CreateUserDto): Promise<User> {
    const { email, name, password } = user;

    // 1 Verificamos si el usuario ya existe por su email
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('El email ya esta registrado');
    }

    try {
      // 2 Crear el nuevo usuario
      const newUser = this.userRepository.create({
        email,
        name,
        password,
      });
      // 3 Guardamos el usuario en la DB y lo retornamos
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new BadRequestException('Error al crear el usuario', error);
    }
  }
}
