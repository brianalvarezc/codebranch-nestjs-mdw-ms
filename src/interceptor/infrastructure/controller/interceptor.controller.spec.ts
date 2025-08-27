import { Test, TestingModule } from '@nestjs/testing';
import { InterceptorController } from './interceptor.controller';
import { InterceptorService } from '../../service/interceptor.service';

describe('InterceptorController', () => {
  let controller: InterceptorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterceptorController],
      providers: [InterceptorService],
    }).compile();

    controller = module.get<InterceptorController>(InterceptorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});