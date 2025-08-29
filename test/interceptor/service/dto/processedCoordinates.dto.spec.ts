import { ProcessedCoordinatesDto } from 'interceptor/service/dto/processedCoordinates.dto';
import { PointDto } from 'interceptor/service/dto/points.dto';
import { BoundsDto } from 'interceptor/service/dto/bounds.dto';

describe('ProcessedCoordinatesDto', () => {
    it('should create an instance with given centroid and bounds', () => {
        const centroid: PointDto = { lat: 1, lng: 2 };
        const bounds: BoundsDto = { north: 0, south: 0, east: 2, west: 3 };

        const dto = new ProcessedCoordinatesDto();
        dto.centroid = centroid;
        dto.bounds = bounds;

        expect(dto.centroid).toEqual(centroid);
        expect(dto.bounds).toEqual(bounds);
    });

    it('should allow updating centroid and bounds', () => {
        const dto = new ProcessedCoordinatesDto();
        dto.centroid = { lat: 5, lng: 6 };
        dto.bounds = { north: 4, south: 5, east: 6, west: 7 };

        dto.centroid = { lat: 10, lng: 20 };
        dto.bounds = { north: 8, south: 9, east: 12, west: 15 };

        expect(dto.centroid).toEqual({ lat: 10, lng: 20 });
        expect(dto.bounds).toEqual({ north: 8, south: 9, east: 12, west: 15 });
    });

    it('should have undefined properties if not set', () => {
        const dto = new ProcessedCoordinatesDto();
        expect(dto.centroid).toBeUndefined();
        expect(dto.bounds).toBeUndefined();
    });
});