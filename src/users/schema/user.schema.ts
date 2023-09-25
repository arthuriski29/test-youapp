import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from 'src/auth/schemas/auth.schema';
// import moment from 'moment';

@Schema({
  timestamps: true,
})
export class Users {
  @Prop()
  name: string;

  @Prop({
    // type: String,
    // set: function (value: any) {
    //   return moment(value, 'YYYY-MM-DD').toDate();
    // },
  })
  birthday: Date;

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
