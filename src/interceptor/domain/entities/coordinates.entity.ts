export class CoordinatesEntity {
  constructor(
    public readonly points: Array<{ lat: number; lng: number }>,
  ) {}
}
