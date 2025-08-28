import { BoundsDto } from 'interceptor/service/dto/bounds.dto';

describe('BoundsDto', () => {
    it('should create an instance with correct properties', () => {
        const bounds = new BoundsDto();
        bounds.north = 10;
        bounds.south = -10;
        bounds.east = 20;
        bounds.west = -20;

        expect(bounds.north).toBe(10);
        expect(bounds.south).toBe(-10);
        expect(bounds.east).toBe(20);
        expect(bounds.west).toBe(-20);
    });

    it('should allow updating properties', () => {
        const bounds = new BoundsDto();
        bounds.north = 5;
        bounds.south = 2;
        bounds.east = 8;
        bounds.west = 1;

        bounds.north = 15;
        bounds.south = -5;
        bounds.east = 18;
        bounds.west = -1;

        expect(bounds.north).toBe(15);
        expect(bounds.south).toBe(-5);
        expect(bounds.east).toBe(18);
        expect(bounds.west).toBe(-1);
    });

    it('should have undefined properties if not set', () => {
        const bounds = new BoundsDto();
        expect(bounds.north).toBeUndefined();
        expect(bounds.south).toBeUndefined();
        expect(bounds.east).toBeUndefined();
        expect(bounds.west).toBeUndefined();
    });
});