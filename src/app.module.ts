import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherModule } from './weather/weather.module';
import { WeatherController } from './weather/weather.controller';

@Module({
  imports: [HttpModule, WeatherModule],
  controllers: [AppController, WeatherController],
  providers: [AppService],
})
export class AppModule { }