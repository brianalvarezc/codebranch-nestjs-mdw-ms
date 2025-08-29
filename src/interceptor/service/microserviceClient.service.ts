import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ProcessedCoordinatesDto } from './dto/processedCoordinates.dto';

import { env } from '@src/config';
import { CoordinatesDto } from './dto/coordinates.dto';
import { PointDto } from './dto/points.dto';
import { BoundsDto } from './dto/bounds.dto';

@Injectable()
export class MicroServiceClient {
  constructor(private readonly httpService: HttpService) { }

  send(coordinatesDto: CoordinatesDto): Observable<ProcessedCoordinatesDto> {
    // return this.httpService
    //   .post(`${env.microServiceUrl}/${env.microServicePath}`, coordinatesDto)
    //   .pipe(
    //     map((response: AxiosResponse) => response.data as ProcessedCoordinatesDto)
    //   );

    // Simulando un llamado a una api de 5 segundos
    return this.mockResponse();
  }

  mockResponse(): Observable<ProcessedCoordinatesDto> {
    const response = new ProcessedCoordinatesDto();
    const centroid = new PointDto();
    centroid.lat = 0;
    centroid.lng = 0;
    const bounds = new BoundsDto();
    bounds.east = 0;
    bounds.west = 0;
    bounds.north = 0;
    bounds.south = 0;
    response.centroid = centroid;
    response.bounds = bounds;
    const delayTime = 1000 * (Math.floor(Math.random() * 5) + 1);
    return of(response).pipe(delay(delayTime));
  }
}
