import { Module } from '@nestjs/common';
import { InterceptorService } from './service/interceptor.service';
import { InterceptorController } from './infrastructure/controller/interceptor.controller';

@Module({
  providers: [InterceptorService],
  controllers: [InterceptorController]
})
export class InterceptorModule {}
