import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
// import { Interests } from 'src/profiles/schema/interest.schema';

@Schema({
  timestamps: true,
})
export class Profiles {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  name: string;

  @Prop({})
  birthday: Date;

  @Prop({})
  zodiac: string;

  @Prop({})
  horoscope: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Interest' })
  // interest: Interests;

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  //   user: Auth;
}

export const ProfilesSchema = SchemaFactory.createForClass(Profiles);
