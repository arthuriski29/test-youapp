import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../schemas/user.schema';
import { CustomRequest } from 'src/interface/custom-request.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: any, req: CustomRequest) {
    const { id } = payload;

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint');
    }

    req.user = user;

    return user;
  }
}
// jwtFromRequest: ExtractJwt.fromBodyField('x-access-token'),
