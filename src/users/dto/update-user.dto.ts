import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// import { IsArray, IsDate, IsNumberString, IsString } from 'class-validator';
// import { Transform } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @IsString()
  // readonly name?: string;
  // @IsDate()
  // @Transform(({ value }) => new Date(value))
  // readonly birthday?: Date;
  // @IsNumberString()
  // readonly height?: number;
  // @IsNumberString()
  // readonly weight?: number;
  // @IsArray()
  // // @ArrayMinSize(1, { message: 'At least One Interest is required' })
  // readonly interest?: [string];
}
