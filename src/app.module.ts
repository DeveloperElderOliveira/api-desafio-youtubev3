import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './services/google.strategy';

@Module({
  imports: [],
  controllers: [AppController,AuthController],
  providers: [AppService,AuthService,GoogleStrategy],
})
export class AppModule {}
