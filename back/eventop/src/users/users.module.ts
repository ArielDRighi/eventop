// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { User } from './entities/users.entity'; // Asegúrate de que esté en la ruta correcta

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra UserRepository con TypeOrmModule
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
