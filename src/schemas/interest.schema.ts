import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
// import { Profiles } from 'src/profiles/schema/profile.schema';

@Schema({
  timestamps: true,
})
export class Interests {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profiles' })
  // profile: Profiles;

  @Prop()
  interest: [string];
}

export const InterestSchema = SchemaFactory.createForClass(Interests);
