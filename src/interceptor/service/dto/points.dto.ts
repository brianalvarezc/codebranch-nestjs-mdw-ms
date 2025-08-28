import { IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PointDto {
    @ApiProperty({type: Number, example: 40.7128})
    @IsNumber()
    lat: number;

    @ApiProperty({type: Number, example: -74.0059})
    @IsNumber()
    lng: number;
}