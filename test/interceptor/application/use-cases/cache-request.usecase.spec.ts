import { CacheRequestUseCase } from 'interceptor/application/use-cases/cache-request.usecase';
import { CoordinatesEntity } from 'interceptor/domain/entities/coordinates.entity';
import { ProcessedCoordinatesEntity } from 'interceptor/domain/entities/processedCoordinates.entity';

describe('CacheRequestUseCase', () => {
  let cacheRequestUseCase: CacheRequestUseCase;
  let coordinates: CoordinatesEntity;
  let processed: ProcessedCoordinatesEntity;

  beforeEach(() => {
    cacheRequestUseCase = new CacheRequestUseCase();
    coordinates = { points: [{ x: 1, y: 2 }, { x: 3, y: 4 }] } as unknown as CoordinatesEntity;
    processed = { result: 'processed', data: [1, 2, 3] } as unknown as ProcessedCoordinatesEntity;
  });

  it('should return null if cache is empty', (done) => {
    cacheRequestUseCase.get(coordinates).subscribe((value) => {
      expect(value).toBeNull();
      done();
    });
  });

  it('should set and get a cached value', (done) => {
    cacheRequestUseCase.set(coordinates, processed);
    cacheRequestUseCase.get(coordinates).subscribe((value) => {
      expect(value).toEqual(processed);
      done();
    });
  });

  it('should return null for different coordinates', (done) => {
    cacheRequestUseCase.set(coordinates, processed);
    const otherCoordinates = { points: [{ x: 5, y: 6 }] } as unknown as CoordinatesEntity;
    cacheRequestUseCase.get(otherCoordinates).subscribe((value) => {
      expect(value).toBeNull();
      done();
    });
  });
});