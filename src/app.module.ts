import { Module } from '@nestjs/common';
import { InterceptorModule } from './interceptor/interceptor.module';

@Module({
  imports: [
    InterceptorModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
