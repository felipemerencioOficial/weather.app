import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
const { format, startOfHour } = require('date-fns');
import axios from 'axios';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

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

  // Função para obter latitude e longitude a partir do nome da cidade e estado
  async getCoordinates(city: string, state: string): Promise<{ latitude: number, longitude: number }> {
    const apiKey = process.env.OPENCAGE_API_KEY; // Substitua pela sua chave de API do OpenCage
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city + ', ' + state)}&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      throw new Error(`Error fetching coordinates: ${error.message}`);
    }
  }

  // TODO: Remover time zone fixo
  // TODO: Remover campo de country
  async getWeatherForecast(country: string, state: string, city: string): Promise<string> {
    // const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=-22.9056&longitude=-47.0608&hourly=temperature_2m&timezone=America%2FSao_Paulo`;
    // Obtém as coordenadas da cidade e estado
    const { latitude, longitude } = await this.getCoordinates(city, state);
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=America%2FSao_Paulo`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(apiUrl).pipe(
          map(response => response.data)
        )
      );

      // Obtém a hora cheia atual
      const currentHour = this.getCurrentHour();

      // Encontra o índice da hora específica
      const hourIndex = this.findHourIndex(response.hourly, currentHour.toString());
      if (hourIndex !== -1) {
        const temperature = response.hourly.temperature_2m[hourIndex];
        return `Atualmente são ${temperature}°C em ${city}`;
      } else {
        return 'Hour not found in the response data';
      }
    } catch (error) {
      return `Error fetching weather data: ${error.message}`;
    }
  }
}