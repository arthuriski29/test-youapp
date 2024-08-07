import {
  // BadRequestException,
  Injectable,
  // NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

//SCHEMAS
import { User } from '../schemas/user.schema';

//DTO'S
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

import { AuthResponse } from '../interface/auth-response.interface';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, username, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return {
      success: true,
      message: 'User has been created successfully',
      token: token,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    try {
      const { email, username, password } = loginDto;
      if (!email && !username) {
        throw new UnauthorizedException('Enter your Email or Username');
      }

      // # Can login with username/email (Optional), password (Must)

      let user;
      if (email) {
        user = await this.userModel.findOne({ email });
        if (!user) {
          throw new UnauthorizedException('Invalid email');
        }
        if (email !== user.email) {
          throw new UnauthorizedException('Email is not match');
        }
      }
      if (username) {
        user = await this.userModel.findOne({ username });
        if (!user) {
          throw new UnauthorizedException('Invalid username');
        }
        if (username !== user.username) {
          throw new UnauthorizedException('Username is not match');
        }
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        throw new UnauthorizedException('Password is not match');
      }

      const token = this.jwtService.sign({ id: user._id });

      return {
        success: true,
        message: 'User has been logged in',
        token: token,
      };
    } catch (error) {
      throw new UnauthorizedException('Unauthorized check your request');
    }
  }

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateProfile(
    username: string,
    profileData: any,
  ): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ username }, profileData, { new: true })
      .exec();
  }
}
