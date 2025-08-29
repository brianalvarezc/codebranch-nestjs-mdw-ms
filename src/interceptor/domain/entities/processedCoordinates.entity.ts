export class ProcessedCoordinatesEntity {
  constructor(
    public readonly centroid: { lat: number; lng: number },
    public readonly bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    },
  ) {}
}
