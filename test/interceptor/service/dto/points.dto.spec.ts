import { validate } from 'class-validator';
import { PointDto } from 'interceptor/service/dto/points.dto';

describe('PointDto', () => {
    it('should validate with correct lat and lng', async () => {
        const dto = new PointDto();
        dto.lat = 40.7128;
        dto.lng = -74.0059;

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation if lat is not a number', async () => {
        const dto = new PointDto();
        // @ts-expect-error
        dto.lat = 'not-a-number';
        dto.lng = -74.0059;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some(e => e.property === 'lat')).toBe(true);
    });

    it('should fail validation if lng is not a number', async () => {
        const dto = new PointDto();
        dto.lat = 40.7128;
        // @ts-expect-error
        dto.lng = 'not-a-number';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some(e => e.property === 'lng')).toBe(true);
    });

    it('should fail validation if lat is missing', async () => {
        const dto = new PointDto();
        dto.lng = -74.0059;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some(e => e.property === 'lat')).toBe(true);
    });

    it('should fail validation if lng is missing', async () => {
        const dto = new PointDto();
        dto.lat = 40.7128;
        // lng is missing

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some(e => e.property === 'lng')).toBe(true);
    });
});