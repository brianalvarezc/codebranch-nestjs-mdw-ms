import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { CoordinatesEntity } from '../../domain/entities/coordinates.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { env } from 'src/config';

@Injectable()
export class FastApiClient {
  constructor(private readonly httpService: HttpService) {}

  send(entity: CoordinatesEntity): Observable<any> {
    return this.httpService.post(`${env.fastApiUrl}/${env.fastApiPath}`, { points: entity.points }).pipe(
      map((response: AxiosResponse) => response.data),
    );
  }
}
