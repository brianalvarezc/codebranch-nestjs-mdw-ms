import { ProcessedCoordinatesEntity } from '@interceptor/domain/entities/processedCoordinates.entity';

describe('ProcessedCoordinatesEntity', () => {
  it('should create an instance with correct centroid and bounds', () => {
    const centroid = { lat: 10, lng: 20 };
    const bounds = { north: 15, south: 5, east: 25, west: 15 };

    const entity = new ProcessedCoordinatesEntity(centroid, bounds);

    expect(entity.centroid).toEqual(centroid);
    expect(entity.bounds).toEqual(bounds);
  });

  it('should have readonly properties', () => {
    const centroid = { lat: 1, lng: 2 };
    const bounds = { north: 3, south: 4, east: 5, west: 6 };
    const entity = new ProcessedCoordinatesEntity(centroid, bounds);

    expect(() => {
      // @ts-expect-error
      entity.centroid = { lat: 0, lng: 0 };
    }).toThrow();

    expect(() => {
      // @ts-expect-error
      entity.bounds = { north: 0, south: 0, east: 0, west: 0 };
    }).toThrow();
  });
});