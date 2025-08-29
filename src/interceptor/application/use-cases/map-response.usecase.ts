import { ProcessedCoordinatesEntity } from '../../domain/entities/processedCoordinates.entity';

export class MapResponseUseCase {
  execute(apiResponse: any): ProcessedCoordinatesEntity {
    return new ProcessedCoordinatesEntity(apiResponse.centroid, apiResponse.bounds);
  }
}
