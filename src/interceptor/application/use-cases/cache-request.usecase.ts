import { CoordinatesEntity } from '../../domain/entities/coordinates.entity';
import { ResponseEntity } from '../../domain/entities/response.entity';
import { Observable, of } from 'rxjs';

const cache = new Map<string, ResponseEntity>();

export class CacheRequestUseCase {
  get(entity: CoordinatesEntity): Observable<ResponseEntity | null> {
    const key = JSON.stringify(entity.points);
    return of(cache.get(key) ?? null);
  }

  set(entity: CoordinatesEntity, response: ResponseEntity): void {
    const key = JSON.stringify(entity.points);
    cache.set(key, response);
  }
}
