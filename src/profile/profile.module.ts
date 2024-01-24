import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { UserSchema } from 'src/schemas/user.schema';
import { ProfilesSchema } from 'src/schemas/profile.schema';
import { InterestSchema } from 'src/schemas/interest.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Profiles', schema: ProfilesSchema }]),
    MongooseModule.forFeature([{ name: 'Interests', schema: InterestSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class ProfileModule {}
