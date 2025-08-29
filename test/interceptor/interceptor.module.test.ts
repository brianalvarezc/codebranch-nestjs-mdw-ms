import { Test, TestingModule } from '@nestjs/testing';
import { InterceptorModule } from '../../src/interceptor/interceptor.module';
import { InterceptorService } from '../../src/interceptor/service/interceptor.service';
import { CacheService } from '../../src/interceptor/service/cache.service';
import { MicroServiceClient } from '../../src/interceptor/service/microserviceClient.service';
import { ValidateCoordinatesUseCase } from '../../src/interceptor/application/use-cases/validate-coordinates.usecase';
import { InterceptorController } from '../../src/interceptor/infrastructure/controller/interceptor.controller';

describe('InterceptorModule', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [InterceptorModule],
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should provide InterceptorService', () => {
        const service = module.get<InterceptorService>(InterceptorService);
        expect(service).toBeDefined();
    });

    it('should provide CacheService', () => {
        const service = module.get<CacheService>(CacheService);
        expect(service).toBeDefined();
    });

    it('should provide MicroServiceClient', () => {
        const service = module.get<MicroServiceClient>(MicroServiceClient);
        expect(service).toBeDefined();
    });

    it('should provide ValidateCoordinatesUseCase', () => {
        const useCase = module.get<ValidateCoordinatesUseCase>(ValidateCoordinatesUseCase);
        expect(useCase).toBeDefined();
    });

    it('should have InterceptorController', () => {
        const controller = module.get<InterceptorController>(InterceptorController);
        expect(controller).toBeDefined();
    });

    it('should export InterceptorService', () => {
        const exportedService = module.get<InterceptorService>(InterceptorService);
        expect(exportedService).toBeDefined();
    });
});