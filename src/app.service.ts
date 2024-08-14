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
    return format(startOfCurrentHour, "yyyy-MM-dd'T'HH:00:00");
  }

  // TODO: Faz funcionar a tratativa do data e horario para pegar a temperatura correta
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
      console.log(response);

      // Obtém a hora cheia atual
      const currentHour = this.getCurrentHour();
      console.log(`Current Hour: ${currentHour}`);
      // console.log(`Time 2 ${response.time[currentHour]}`);
      // console.log("BATATA");
      // console.log(`Temperature: ${response.hourly.temperature_2m[9]}`);

      return `The weather in ${country}, ${state} in the ${city} is ${response.temperature} degrees`;
    } catch (error) {
      return `Error fetching weather data: ${error.message}`;
    }
  }
}