import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password min 6 character' })
  readonly password: string;
}
