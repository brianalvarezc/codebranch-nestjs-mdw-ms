import { validate } from 'class-validator';
import { CoordinatesDto } from 'interceptor/service/dto/coordinates.dto';
import { PointDto } from 'interceptor/service/dto/points.dto';

describe('CoordinatesDto', () => {
    it('should validate with an array of valid PointDto', async () => {
        const dto = new CoordinatesDto();
        dto.points = [
            Object.assign(new PointDto(), { x: 1, y: 2 }),
            Object.assign(new PointDto(), { x: 3, y: 4 }),
        ];
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation if points is not an array', async () => {
        const dto = new CoordinatesDto();
        // @ts-expect-error
        dto.points = 'not-an-array';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('points');
    });

    it('should fail validation if points contains invalid PointDto', async () => {
        const dto = new CoordinatesDto();
        // missing required properties in PointDto
        dto.points = [Object.assign(new PointDto(), {})];
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('points');
    });

    it('should fail validation if points is undefined', async () => {
        const dto = new CoordinatesDto();
        // points is undefined
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('points');
    });
});