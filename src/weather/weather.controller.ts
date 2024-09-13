import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';

import { AppService } from '../app.service';

@Controller('weather')
export class WeatherController {
  // constructor(private readonly weatherService: WeatherService, appService: AppService) { }
  constructor(private readonly appService: AppService) { }

  @Get('weather/:state/:city')
  getWeatherForecast(@Param('state') state: string, @Param('city') city: string) {
    return this.appService.getWeatherForecast(state, city);
  }

  // @Post()
  // create(@Body() createWeatherDto: CreateWeatherDto) {
  //   return this.weatherService.create(createWeatherDto);
  // }

  // @Get()
  // findAll() {
  //   return this.weatherService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.weatherService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWeatherDto: UpdateWeatherDto) {
  //   return this.weatherService.update(+id, updateWeatherDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.weatherService.remove(+id);
  // }
}
