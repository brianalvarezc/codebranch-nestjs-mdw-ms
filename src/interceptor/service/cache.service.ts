import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ProcessedCoordinatesDto } from './dto/processedCoordinates.dto';
import { CoordinatesDto } from './dto/coordinates.dto';

@Injectable()
export class CacheService {
  private cache = new Map<string, ProcessedCoordinatesDto>();

  private generateCacheKey(coordinates: CoordinatesDto): string {
    const sortedPoints = [...coordinates.points].sort((a, b) => {
      if (a.lat === b.lat) {
        return a.lng - b.lng;
      }
      return a.lat - b.lat;
    });
    return JSON.stringify(sortedPoints);
  }

  get(coordinates: CoordinatesDto): Observable<ProcessedCoordinatesDto | null> {
    const key = this.generateCacheKey(coordinates);
    return of(this.cache.get(key) ?? null);
  }

  set(coordinates: CoordinatesDto, value: ProcessedCoordinatesDto): void {
    const key = this.generateCacheKey(coordinates);
    this.cache.set(key, value);
  }
}
