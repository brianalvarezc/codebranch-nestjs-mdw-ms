import { CacheService } from 'interceptor/service/cache.service';
import { CoordinatesDto } from 'interceptor/service/dto/coordinates.dto';
import { ProcessedCoordinatesDto } from 'interceptor/service/dto/processedCoordinates.dto';

describe('CacheService', () => {
    let service: CacheService;

    beforeEach(() => {
        service = new CacheService();
    });

    const coordsA: CoordinatesDto = {
        points: [
            { lat: 1, lng: 2 },
            { lat: 3, lng: 4 },
        ],
    };

    const coordsB: CoordinatesDto = {
        points: [
            { lat: 3, lng: 4 },
            { lat: 1, lng: 2 },
        ],
    };

    const processed: ProcessedCoordinatesDto = {
        result: 'test',
    } as unknown as ProcessedCoordinatesDto;

    it('should return null for missing cache entry', (done) => {
        service.get(coordsA).subscribe((value) => {
            expect(value).toBeNull();
            done();
        });
    });

    it('should store and retrieve a cache entry', (done) => {
        service.set(coordsA, processed);
        service.get(coordsA).subscribe((value) => {
            expect(value).toEqual(processed);
            done();
        });
    });

    it('should treat coordinates with same points in different order as same key', (done) => {
        service.set(coordsA, processed);
        service.get(coordsB).subscribe((value) => {
            expect(value).toEqual(processed);
            done();
        });
    });

    it('should overwrite cache entry for same coordinates', (done) => {
        const processed2: ProcessedCoordinatesDto = { result: 'other' } as unknown as ProcessedCoordinatesDto;
        service.set(coordsA, processed);
        service.set(coordsA, processed2);
        service.get(coordsA).subscribe((value) => {
            expect(value).toEqual(processed2);
            done();
        });
    });
});