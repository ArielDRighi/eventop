import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInAuthDto } from './dto/signIn.dto';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Servicios

  // Servicio de inicio de sesión
  async signIn(credential: SignInAuthDto) {
    // Revisamos si el mail ya esta registrado en la DB
    const dbUser = await this.userService.findOneByEmail(credential.email);
    if (!dbUser) {
      // Si el usuario NO existe en la DB se retorna un error
      throw new BadRequestException('Usuario no encontrado');
    }
    // Revisamos la contraseña enviada con la de la DB
    const isPasswordValid = await bcrypt.compare(
      credential.password,
      dbUser.password,
    );
    // Si la contraseña no coincide con la de la DB se retorna error
    if (!isPasswordValid) {
      throw new BadRequestException('Contraseña invalida');
    }
    const payload = { username: dbUser.email, sub: dbUser.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Servicio de creación de usuario
  async signUp(user: CreateUserDto) {
    // Revisamos que las contraseñas coincidan
    if (user.password !== user.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    // Revisamos si el email ya existe en la DB
    const dbUser = await this.userService.findOneByEmail(user.email);
    if (dbUser) {
      throw new BadRequestException('Email ya registrado en la base de datos');
    }

    // Hasheamos la password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Ocurrió un error con la contraseña');
    }

    const newUser = await this.userService.createUser({
      ...user,
      password: hashedPassword,
      confirmPassword: undefined,
    });

    return newUser;
  }
}
