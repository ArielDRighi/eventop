import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  // Mail
  @IsEmail()
  @IsNotEmpty()
  email: string;

  //   Name
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  //   Password
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/, {
    message:
      'La contraseña debe tener al menos una minúscula, una mayúscula, un numero y un carácter especial',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  //   Confirm Password
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/, {
    message:
      'La contraseña debe tener al menos una minúscula, una mayúscula, un numero y un carácter especial',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
