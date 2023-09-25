import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// const user = process.env.MONGO_ATLAS_USER;
// const password = process.env.MONGO_ATLAS_PASSWORD;
// const dbname = process.env.MONGO_ATLAS_DB;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.DB_URI,
      // `mongodb+srv://${user}:${password}@cluster0.q65hmdh.mongodb.net/${dbname}?retryWrites=true&w=majority`,
      // `mongodb+srv://SbhxKp6yVUfgoMEA:SbhxKp6yVUfgoMEA@cluster0.q65hmdh.mongodb.net/test-youapp?retryWrites=true&w=majority`,
    ),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
