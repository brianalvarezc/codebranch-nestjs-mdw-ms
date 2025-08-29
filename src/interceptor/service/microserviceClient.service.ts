import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { ProcessedCoordinatesDto } from './dto/processedCoordinates.dto';

import { env } from '@src/config';
import { CoordinatesDto } from './dto/coordinates.dto';
import { PointDto } from './dto/points.dto';
import { BoundsDto } from './dto/bounds.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class MicroServiceClient {
  constructor(private readonly httpService: HttpService) { }

  send(coordinatesDto: CoordinatesDto): Observable<ProcessedCoordinatesDto> {
      const base = `${env.microServiceUrl}`.replace('localhost', '127.0.0.1');
      const url = `${base}/${env.microServicePath}`.replace(/\/\/+/, '/').replace('http:/', 'http://');

      const payload = instanceToPlain(coordinatesDto);

      return this.httpService
        .post<ProcessedCoordinatesDto>(url, payload, {
            headers: {
              'Content-Type': 'application/json',
            }
          }
      )
      .pipe(
        map((response: AxiosResponse) => response.data as ProcessedCoordinatesDto),
        catchError((error) => {
          const status = error?.response?.status || 500;
          const detail = error?.response?.data || error?.message || 'Unknown error';
          console.error('Error calling microservice:', detail);
          return throwError(() => new HttpException({
            statusCode: status,
            message: 'Error processing request',
            error: detail,
          }, status));
        })
      );
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
