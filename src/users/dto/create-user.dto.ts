import { Transform } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNumberString,
  IsDate,
  IsEmpty,
} from 'class-validator';
import { Auth } from 'src/auth/schemas/auth.schema';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly birthday: Date;

  @IsNumberString()
  readonly height: number;

  @IsNumberString()
  readonly weight: number;

  @IsArray()
  readonly interest: string[];

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: Auth;
}
