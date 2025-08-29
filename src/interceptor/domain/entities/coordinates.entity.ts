import { PointEntity } from "./point.entity";

export class CoordinatesEntity {
  constructor(
    public readonly points: Array<PointEntity>,
  ) {}
}
