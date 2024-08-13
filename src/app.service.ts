import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  // TODO: Faz funcionar a requisição para api de clima 
  async getWeatherForecast(country: string, state: string, city: string): Promise<string> {
    // const apiUrl = `https://api.example.com/weather?country=${country}&state=${state}&city=${city}`;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=-22.9056&longitude=-47.0608&hourly=temperature_2m&timezone=America%2FSao_Paulo`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(apiUrl).pipe(
          map(response => response.data)
        )
      );
      return `The weather in ${country}, ${state} in the ${city} is ${response.temperature} degrees`;
    } catch (error) {
      return `Error fetching weather data: ${error.message}`;
    }
  }
}