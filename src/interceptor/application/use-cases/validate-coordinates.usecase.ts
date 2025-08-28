import { Injectable } from '@nestjs/common';
import { CoordinatesEntity } from '../../domain/entities/coordinates.entity';
import { Observable, of } from 'rxjs';

@Injectable()
export class ValidateCoordinatesUseCase {
  execute(entity: CoordinatesEntity): Observable<boolean> {
    if (
      !entity.points || 
      !Array.isArray(entity.points) || 
      entity.points.length === 0
    ) return of(false);
    return of(entity.points.every(
      (p) => (
        typeof p.lat === 'number' && 
        typeof p.lng === 'number'
      )
    ));
  }
}
