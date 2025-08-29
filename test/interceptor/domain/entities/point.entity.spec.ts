import { PointEntity } from '@interceptor/domain/entities/point.entity';

describe('PointEntity', () => {
  it('should create an instance with given lat and lng', () => {
    const lat = 10.123;
    const lng = -20.456;
    const point = new PointEntity(lat, lng);

    expect(point.lat).toBe(lat);
    expect(point.lng).toBe(lng);
  });

  it('should have lat and lng as readonly properties', () => {
    const point = new PointEntity(1, 2);

    // @ts-expect-error: lat is readonly
    expect(() => { point.lat = 5; }).toThrow();
    // @ts-expect-error: lng is readonly
    expect(() => { point.lng = 6; }).toThrow();
  });

  it('should allow zero and negative values', () => {
    const point = new PointEntity(0, -180);
    expect(point.lat).toBe(0);
    expect(point.lng).toBe(-180);
  });
});