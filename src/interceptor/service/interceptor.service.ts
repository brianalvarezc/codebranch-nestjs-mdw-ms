import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { map, Observable, of, switchMap } from 'rxjs';
import { CoordinatesDto } from './dto/coordinates.dto';
import { PointsMapper } from './mapper/points.mapper';
import { ValidateCoordinatesUseCase } from '../application/use-cases/validate-coordinates.usecase';
import { MicroServiceClient } from './microserviceClient.service';
import { CacheService } from './cache.service';
import { ProcessedCoordinatesDto } from './dto/processedCoordinates.dto';
import { CoordinatesEntity } from '../domain/entities/coordinates.entity';

@Injectable()
export class InterceptorService {
	constructor(
		private readonly validateCoordinatesUseCase: ValidateCoordinatesUseCase,
		private readonly cacheService: CacheService,
		private readonly microServiceClient: MicroServiceClient,
	) { }

	create(coordinatesDto: CoordinatesDto): Observable<ProcessedCoordinatesDto> {
		const entity = this.dtoToEntity(coordinatesDto);

		return this.validateEntity(entity).pipe(
			switchMap((isValid) => {
				if (!isValid) throw this.buildBadRequest();
				return this.findOrFetch(entity, coordinatesDto);
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

	private buildBadRequest(): HttpException {
		return new HttpException({
			statusCode: 400,
			message: 'Invalid coordinates',
			error: 'The provided coordinates are not valid',
		}, 400);
	}

	private buildInternalError(err: unknown): HttpException {
		return new HttpException({
			statusCode: 500,
			message: 'Internal server error',
			error: (err as any)?.message ?? String(err),
		}, 500);
	}
}
