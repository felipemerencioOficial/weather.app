import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { HttpModule } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';

// TODO: Seguir na implementação do get na api de Weather, conforme exemplo passado pelo copilot
// TODO: Exemplo no final da pagina

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }



// // app.module.ts
// import { Module } from '@nestjs/common';
// import { HttpModule } from '@nestjs/axios';
// import { AppService } from './app.service';
// import { AppController } from './app.controller';

// @Module({
//   imports: [HttpModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }

// // app.service
// import { Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class AppService {
//   constructor(private readonly httpService: HttpService) { }

//   getWeatherForecast(country: string, state: string, city: string): Promise<string> {
//     const apiUrl = `https://api.example.com/weather?country=${country}&state=${state}&city=${city}`;
//     return this.httpService.get(apiUrl)
//       .pipe(
//         map(response => response.data)
//       )
//       .toPromise()
//       .then(data => `The weather in ${country}, ${state} in the ${city} is ${data.temperature} degrees`)
//       .catch(error => `Error fetching weather data: ${error.message}`);
//   }
// }