import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Role } from '../roles.enum';
import { ApiProperty } from '@nestjs/swagger';

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
  @Length(3, 80)
  name: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    required: true,
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/, {
    message:
      'La contraseña debe tener al menos una minúscula, una mayúscula, un numero y un carácter especial',
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
      'La contraseña debe tener al menos una minúscula, una mayúscula, un numero y un carácter especial',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({
    type: Number,
    description: 'The role number of the user',
    required: true,
  })
  @IsEnum(Role)
  @IsEmpty()
  role: Role;
}
