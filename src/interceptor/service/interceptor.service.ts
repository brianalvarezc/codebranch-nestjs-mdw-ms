import { BadRequestException, Injectable } from '@nestjs/common';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { CoordinatesDto } from './dto/coordinates.dto';
import { PointsMapper } from './mapper/points.mapper';
import { ValidateCoordinatesUseCase } from '../application/use-cases/validate-coordinates.usecase';
import { MicroServiceClient } from './microserviceClient.service';
import { CacheService } from './cache.service';
import { ProcessedCoordinatesDto } from './dto/processedCoordinates.dto';
import { ErrorResponseDto } from './dto/errorResponse.dto';
import { CoordinatesEntity } from '../domain/entities/coordinates.entity';

@Injectable()
export class InterceptorService {
	constructor(
		private readonly validateCoordinatesUseCase: ValidateCoordinatesUseCase,
		private readonly cacheService: CacheService,
		private readonly microServiceClient: MicroServiceClient,
	) { }

	create(coordinatesDto: CoordinatesDto): Observable<ProcessedCoordinatesDto | ErrorResponseDto> {
		const entity = this.dtoToEntity(coordinatesDto);

		return this.validateEntity(entity).pipe(
			switchMap((isValid) => {
				if (!isValid) return of(this.buildBadRequest());
				return this.findOrFetch(entity, coordinatesDto);
			}),
			catchError((err): Observable<ProcessedCoordinatesDto | ErrorResponseDto> => {
				return of(this.buildInternalError(err));
			}),
		);
	}




	private dtoToEntity(coordinatesDto: CoordinatesDto) {
		return PointsMapper.toEntity(coordinatesDto);
	}

	private validateEntity(entity: CoordinatesEntity): Observable<boolean> {
		return this.validateCoordinatesUseCase.execute(entity);
	}

	private findOrFetch(entity: CoordinatesEntity, coordinatesDto: CoordinatesDto): Observable<ProcessedCoordinatesDto> {
		return this.cacheService.get(coordinatesDto).pipe(
			switchMap((cached: ProcessedCoordinatesDto | null) => {
				if (cached) return of(cached);
				return this.fetchAndCache(entity, coordinatesDto);
			}),
		);
	}

	private fetchAndCache(entity: CoordinatesEntity, coordinatesDto: CoordinatesDto): Observable<ProcessedCoordinatesDto> {
		return this.microServiceClient.send(entity).pipe(
			map((response: ProcessedCoordinatesDto) => {
				this.cacheService.set(coordinatesDto, response);
				return response;
			}),
		);
	}

	private buildBadRequest(): ErrorResponseDto {
		return new ErrorResponseDto(400, 'Invalid coordinates', 'The provided coordinates are not valid');
	}

	private buildInternalError(err: unknown): ErrorResponseDto {
		return new ErrorResponseDto(500, 'Internal server error', (err as any)?.message ?? String(err));
	}
}
