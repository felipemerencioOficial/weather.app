import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
const { format, startOfHour } = require('date-fns');

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  // Função para obter a hora cheia atual no formato desejado
  getCurrentHour(): string {
    const now = new Date();
    const startOfCurrentHour = startOfHour(now);
    return format(startOfCurrentHour, "yyyy-MM-dd'T'HH:00");
  }

  // Função para encontrar o índice da hora específica no array de tempo
  findHourIndex(hourly: any, targetHour: string): number {
    return hourly.time.indexOf(targetHour);
  }

  // TODO: Remover os parametros chubados e implementar a busca por cidade
  async getWeatherForecast(country: string, state: string, city: string): Promise<string> {
    // const apiUrl = `https://api.example.com/weather?country=${country}&state=${state}&city=${city}`;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=-22.9056&longitude=-47.0608&hourly=temperature_2m&timezone=America%2FSao_Paulo`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(apiUrl).pipe(
          map(response => response.data)
        )
      );
      console.log(response);

      // Obtém a hora cheia atual
      const currentHour = this.getCurrentHour();
      console.log(`Current Hour: ${currentHour}`);

      // Encontra o índice da hora específica
      const hourIndex = this.findHourIndex(response.hourly, currentHour.toString());
      if (hourIndex !== -1) {
        const temperature = response.hourly.temperature_2m[hourIndex];
        console.log(`Temperature at 2024-08-29T10:00: ${temperature}°C`);
        return `Agora são ${temperature}°C em ${city}`;
      } else {
        return 'Hour not found in the response data';
      }
    } catch (error) {
      return `Error fetching weather data: ${error.message}`;
    }
  }
}