import { BoundsDto } from "./bounds.dto";
import { PointDto } from "./points.dto";

export class ProcessedCoordinatesDto {
    centroid: PointDto;
    bounds: BoundsDto;
}
