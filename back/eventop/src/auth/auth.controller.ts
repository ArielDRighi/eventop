import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signIn.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Rutas

  @Post('signin')
  signIn(@Body() credential: SignInAuthDto) {
    return this.authService.signIn(credential);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

   @Get('auth0/protected')
   getAuth0Protected(@Req() req: Request){
     console.log(JSON.stringify(request.oidc.idToken));
    return JSON.stringify(request.oidc.user);
    
   }

}





