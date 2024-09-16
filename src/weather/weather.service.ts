import { Injectable } from '@nestjs/common';
// import { CreateWeatherDto } from './dto/create-weather.dto';
// import { UpdateWeatherDto } from './dto/update-weather.dto';
import { HttpService } from '@nestjs/axios';
const { format, startOfHour } = require('date-fns');
import axios from 'axios';
import * as dotenv from 'dotenv';
import tzlookup = require("tz-lookup");
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class WeatherService {
  // create(createWeatherDto: CreateWeatherDto) {
  //   return 'This action adds a new weather';
  // }

  // findAll() {
  //   return `This action returns all weather`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} weather`;
  // }

  // update(id: number, updateWeatherDto: UpdateWeatherDto) {
  //   return `This action updates a #${id} weather`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} weather`;
  // }

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

  // TODO: Ajustar posição dos arquivos
  //            - Resolver os erro de falha na importação do module
  // TODO: Adicionar tratamento de erro
  // TODO: Ajustar para retornar a previsão do tempo para as próximas horas
  async getWeatherForecast(state: string, city: string): Promise<string> {
    const { latitude, longitude } = await this.getCoordinates(city, state);
    const timeZone = tzlookup(latitude, longitude);

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=${timeZone}`;
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
