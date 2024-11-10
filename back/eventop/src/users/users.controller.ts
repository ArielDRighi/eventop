import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/auth/dto/createUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { RoleGuard } from 'src/auth/roles.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
