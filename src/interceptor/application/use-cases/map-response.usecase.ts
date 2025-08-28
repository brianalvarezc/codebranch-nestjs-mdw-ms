import { ProcessedCoordinatesEntity } from '../../domain/entities/processedCoordinates.entity';

export class MapResponseUseCase {
  execute(apiResponse: any): ProcessedCoordinatesEntity {
    // Suponiendo que apiResponse tiene las propiedades necesarias
    return new ProcessedCoordinatesEntity(apiResponse.centroid, apiResponse.bounds);
  }
}
