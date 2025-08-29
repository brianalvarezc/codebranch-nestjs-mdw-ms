import { MapResponseUseCase } from 'interceptor/application/use-cases/map-response.usecase';
import { ProcessedCoordinatesEntity } from 'interceptor/domain/entities/processedCoordinates.entity';

describe('MapResponseUseCase', () => {
    let useCase: MapResponseUseCase;

    beforeEach(() => {
        useCase = new MapResponseUseCase();
    });

    it('should map apiResponse to ProcessedCoordinatesEntity', () => {
        const apiResponse = {
            centroid: { lat: 10, lng: 20 },
            bounds: { northEast: { lat: 15, lng: 25 }, southWest: { lat: 5, lng: 15 } }
        };

        const result = useCase.execute(apiResponse);

        expect(result).toBeInstanceOf(ProcessedCoordinatesEntity);
        expect(result.centroid).toEqual(apiResponse.centroid);
        expect(result.bounds).toEqual(apiResponse.bounds);
    });

    it('should handle missing centroid and bounds', () => {
        const apiResponse = {};

        const result = useCase.execute(apiResponse);

        expect(result).toBeInstanceOf(ProcessedCoordinatesEntity);
        expect(result.centroid).toBeUndefined();
        expect(result.bounds).toBeUndefined();
    });
});