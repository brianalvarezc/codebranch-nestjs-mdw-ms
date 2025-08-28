import { ValidateCoordinatesUseCase } from 'interceptor/application/use-cases/validate-coordinates.usecase';
import { CoordinatesEntity } from 'interceptor/domain/entities/coordinates.entity';
import { firstValueFrom } from 'rxjs';

describe('ValidateCoordinatesUseCase', () => {
    let useCase: ValidateCoordinatesUseCase;

    beforeEach(() => {
        useCase = new ValidateCoordinatesUseCase();
    });

    it('should return false if points is undefined', async () => {
        const entity = {} as CoordinatesEntity;
        const result = await firstValueFrom(useCase.execute(entity));
        expect(result).toBe(false);
    });

    it('should return false if points is not an array', async () => {
        const entity = { points: 'not-an-array' } as any;
        const result = await firstValueFrom(useCase.execute(entity));
        expect(result).toBe(false);
    });

    it('should return false if points array is empty', async () => {
        const entity = { points: [] } as CoordinatesEntity;
        const result = await firstValueFrom(useCase.execute(entity));
        expect(result).toBe(false);
    });

    it('should return false if any point does not have numeric lat/lng', async () => {
        const entity = {
            points: [
                { lat: 10, lng: 20 },
                { lat: 'invalid', lng: 30 }
            ]
        } as CoordinatesEntity;
        const result = await firstValueFrom(useCase.execute(entity));
        expect(result).toBe(false);
    });

    it('should return true if all points have numeric lat/lng', async () => {
        const entity = {
            points: [
                { lat: 10, lng: 20 },
                { lat: 15.5, lng: -30.2 }
            ]
        } as CoordinatesEntity;
        const result = await firstValueFrom(useCase.execute(entity));
        expect(result).toBe(true);
    });
});