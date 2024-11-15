import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Role } from '../enum/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'The email of the user',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The name of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    required: true,
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/, {
    message:
      'The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'The confirm password of the user',
    required: true,
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/, {
    message:
      'The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiHideProperty()
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
