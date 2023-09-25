import { Document } from 'mongoose';

export interface AuthInterface extends Document {
  readonly email: string;
  readonly username: string;
  readonly password: string;
}
