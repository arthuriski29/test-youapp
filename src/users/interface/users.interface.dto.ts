import { Document } from 'mongoose';

export interface UsersInterface extends Document {
  readonly name: string;
  readonly birthday: Date;
  readonly zodiac: string;
  readonly height: number;
  readonly weight: number;
  readonly interest: [string];
}
