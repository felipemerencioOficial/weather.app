import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('weather/:city')
  // TODO: add country and state in url
  getHello(@Param('city') city: string) {
    // return this.appService.getHello();
    return `The weather in ${city} is 72 degrees`;
  }
}
