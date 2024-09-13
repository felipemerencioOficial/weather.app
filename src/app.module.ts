import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { HttpModule } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [HttpModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }