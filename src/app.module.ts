import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { validate } from './config/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
import { RequestModule } from './app/request/request.module';

@Module({
  imports: [
    // 1. Setup ConfigModule (Loads .env files)
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      // REMOVED: load: [dbConfig] - This was causing your error
    }),

    // 2. Setup TypeORM (Uses ConfigService)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dbConfig, // This correctly injects ConfigService into your function
    }),

    // 3. Feature Modules
    UserModule,
    AuthModule,
    RequestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}