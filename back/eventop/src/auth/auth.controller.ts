import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signIn.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() credential: SignInAuthDto) {
    return this.authService.signIn(credential);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  // @Get('auth0/protected')
  // getAuth0Protected(@Req() req: Request) {
  //   console.log(JSON.stringify(request.oidc.idToken));
  //   return JSON.stringify(request.oidc.user);
  // }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected(@Req() req) {
    return req.user;
  }
}
