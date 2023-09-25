import { Transform } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNumberString,
  IsDate,
  IsEmpty,
  // MinLength,
  // ArrayMinSize,
} from 'class-validator';
import { Auth } from 'src/auth/schemas/auth.schema';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  // @IsDate()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly birthday: Date;

  // @IsNumber()
  @IsNumberString()
  readonly height: number;

  // @IsNumber()
  @IsNumberString()
  readonly weight: number;

  @IsArray()
  // @ArrayMinSize(1, { message: 'At least One Interest is required' })
  readonly interest: string[];

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: Auth;
}
