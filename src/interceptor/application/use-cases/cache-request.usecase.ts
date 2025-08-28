import { CoordinatesEntity } from '../../domain/entities/coordinates.entity';
import { ProcessedCoordinatesEntity } from '../../domain/entities/processedCoordinates.entity';
import { Observable, of } from 'rxjs';

const cache = new Map<string, ProcessedCoordinatesEntity>();

export class CacheRequestUseCase {
  get(entity: CoordinatesEntity): Observable<ProcessedCoordinatesEntity | null> {
    const key = JSON.stringify(entity.points);
    return of(cache.get(key) ?? null);
  }

  set(entity: CoordinatesEntity, response: ProcessedCoordinatesEntity): void {
    const key = JSON.stringify(entity.points);
    cache.set(key, response);
  }
}
