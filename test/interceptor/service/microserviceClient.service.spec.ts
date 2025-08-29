import { MicroServiceClient } from 'interceptor/service/microserviceClient.service';
import { HttpService } from '@nestjs/axios';
import { CoordinatesDto } from 'interceptor/service/dto/coordinates.dto';
import { ProcessedCoordinatesDto } from 'interceptor/service/dto/processedCoordinates.dto';
import { PointDto } from 'interceptor/service/dto/points.dto';
import { BoundsDto } from 'interceptor/service/dto/bounds.dto';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

jest.mock('@nestjs/axios');

describe('MicroServiceClient', () => {
  let service: MicroServiceClient;
  let httpService: HttpService;

  beforeEach(() => {
    httpService = new HttpService();
    service = new MicroServiceClient(httpService);
  });

  describe('mockResponse', () => {
    it('should return an observable of ProcessedCoordinatesDto with default values', (done) => {
      service.mockResponse().pipe(take(1)).subscribe((result) => {
        expect(result).toBeInstanceOf(ProcessedCoordinatesDto);
        expect(result.centroid).toBeInstanceOf(PointDto);
        expect(result.centroid.lat).toBe(0);
        expect(result.centroid.lng).toBe(0);
        expect(result.bounds).toBeInstanceOf(BoundsDto);
        expect(result.bounds.east).toBe(0);
        expect(result.bounds.west).toBe(0);
        expect(result.bounds.north).toBe(0);
        expect(result.bounds.south).toBe(0);
        done();
      });
    });
  });

  describe('send', () => {
    it('should call mockResponse and return its value', (done) => {
      const coordinatesDto = new CoordinatesDto();
      // Spy on mockResponse to ensure it's called
      const mockResponseSpy = jest.spyOn(service, 'mockResponse').mockReturnValue(of(new ProcessedCoordinatesDto()));
      service.send(coordinatesDto).pipe(take(1)).subscribe((result) => {
        expect(mockResponseSpy).toHaveBeenCalled();
        expect(result).toBeInstanceOf(ProcessedCoordinatesDto);
        done();
      });
    });
  });
});