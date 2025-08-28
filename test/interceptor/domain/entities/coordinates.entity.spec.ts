import { CoordinatesEntity } from '@interceptor/domain/entities/coordinates.entity';
import { PointEntity } from '@interceptor/domain/entities/point.entity';

describe('CoordinatesEntity', () => {
  it('should create an instance with given points', () => {
    const point1 = new PointEntity(1, 2);
    const point2 = new PointEntity(3, 4);
    const points = [point1, point2];

    const coordinates = new CoordinatesEntity(points);

    expect(coordinates).toBeInstanceOf(CoordinatesEntity);
    expect(coordinates.points).toEqual(points);
  });

  it('should handle empty points array', () => {
    const coordinates = new CoordinatesEntity([]);

    expect(coordinates.points).toEqual([]);
  });

  it('should have readonly points property', () => {
    const point = new PointEntity(5, 6);
    const coordinates = new CoordinatesEntity([point]);

    expect(() => {
      // @ts-expect-error
      coordinates.points = [];
    }).toThrow();
  });
});