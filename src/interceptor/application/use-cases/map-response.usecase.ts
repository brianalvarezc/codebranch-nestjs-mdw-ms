import { ResponseEntity } from '../../domain/entities/response.entity';

export class MapResponseUseCase {
  execute(apiResponse: any): ResponseEntity {
    // Suponiendo que apiResponse tiene las propiedades necesarias
    return new ResponseEntity(apiResponse.centroid, apiResponse.bounds);
  }
}
