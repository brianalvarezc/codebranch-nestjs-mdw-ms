import { IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PointDto } from './points.dto';

export class CoordinatesDto {
    @ApiProperty({ type: [PointDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PointDto)
    points: PointDto[];
}