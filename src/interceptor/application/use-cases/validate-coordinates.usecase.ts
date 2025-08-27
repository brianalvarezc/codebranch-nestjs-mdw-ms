import { CoordinatesEntity } from '../../domain/entities/coordinates.entity';

export class ValidateCoordinatesUseCase {
  execute(entity: CoordinatesEntity): boolean {
    if (!entity.points || !Array.isArray(entity.points) || entity.points.length === 0) return false;
    return entity.points.every(
      (p) => typeof p.lat === 'number' && typeof p.lng === 'number',
    );
  }
}
