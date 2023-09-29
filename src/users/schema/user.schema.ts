import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from 'src/auth/schemas/auth.schema';

@Schema({
  timestamps: true,
})
export class Users {
  @Prop()
  name: string;

  @Prop({})
  birthday: Date;

  @Prop({})
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  interest: [string];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Auth;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
