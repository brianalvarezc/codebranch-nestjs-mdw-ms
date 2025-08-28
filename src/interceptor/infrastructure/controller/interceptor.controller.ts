import { Body, Controller, Get, Post } from '@nestjs/common';
import { InterceptorService } from '../../service/interceptor.service';
import { Observable } from 'rxjs';
import { CoordinatesDto } from 'src/interceptor/service/dto/coordinates.dto';
import { ProcessedCoordinatesDto } from 'src/interceptor/service/dto/processedCoordinates.dto';
import { ErrorResponseDto } from 'src/interceptor/service/dto/errorResponse.dto';

@Controller('interceptor')
export class InterceptorController {
	constructor(private readonly interceptorService: InterceptorService) { }

	@Post()
	create(@Body() createDto: CoordinatesDto): Observable<ProcessedCoordinatesDto | ErrorResponseDto> {
		return this.interceptorService.create(createDto);
	}
}
