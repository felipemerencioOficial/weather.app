import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWeatherForecast(country, state, city): string {
    return `The weather in ${country}, ${state} in the ${city} is 72 degrees - 2`;
  }
}
