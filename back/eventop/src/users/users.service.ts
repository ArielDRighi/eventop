import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/dto/createUser.dto';
import { Role } from 'src/auth/enum/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Retornar usuario por Email
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  // Crear usuario
  async createUser(user: CreateUserDto): Promise<Partial<User>> {
    const { email, name, password, role } = user;
    // Verificamos si el usuario ya existe por su email
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('El email ya esta registrado');
    }
    try {
      // Crear el nuevo usuario
      const newUser = this.userRepository.create({
        email,
        name,
        password,
        role: role ?? Role.User, // Asignar el rol User por defecto si no se proporciona
      });
      // Guardamos el usuario en la DB y lo retornamos
      const savedUser = await this.userRepository.save(newUser);
      // Excluir el campo password de la respuesta
      const { password: _, ...result } = savedUser;
      return result;
    } catch (error) {
      throw new BadRequestException('Error al crear el usuario', error);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
