import { Module } from '@nestjs/common';
import { InterceptorService } from './service/interceptor.service';
import { InterceptorController } from './infrastructure/controller/interceptor.controller';
import { ValidateCoordinatesUseCase } from './application/use-cases/validate-coordinates.usecase';
import { CacheService } from './service/cache.service';
import { MicroServiceClient } from './service/microserviceClient.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({})],
  providers: [
    InterceptorService, CacheService, MicroServiceClient,
    ValidateCoordinatesUseCase,
  ],
  controllers: [InterceptorController],
  exports: [InterceptorService]
})
export class InterceptorModule {}
