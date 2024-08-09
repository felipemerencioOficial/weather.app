import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('weather/:country/:state/:city')
  getWeatherForecast(@Param('country') country: string, @Param('state') state: string, @Param('city') city: string) {
    return this.appService.getWeatherForecast(country, state, city);
  }
}
