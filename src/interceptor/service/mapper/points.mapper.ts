import { CoordinatesEntity } from "@interceptor/domain/entities/coordinates.entity";
import { PointDto } from "@interceptor/service/dto/points.dto";
import { PointEntity } from "@interceptor/domain/entities/point.entity";
import { CoordinatesDto } from "@interceptor/service/dto/coordinates.dto";

export class PointsMapper {
    static toEntity(dto: CoordinatesDto): CoordinatesEntity {
        return new CoordinatesEntity(
                dto.points.map(point => new PointEntity(
                point.lat,
                point.lng
            ))
        );
    }

    static toDto(entity: CoordinatesEntity): CoordinatesDto {
        const dto = new CoordinatesDto();
        dto.points = entity.points.map(point => {
            const pointDto = new PointDto();
            pointDto.lat = point.lat;
            pointDto.lng = point.lng;
            return pointDto;
        });
        return dto;
    }
}
