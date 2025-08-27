import { Test, TestingModule } from '@nestjs/testing';
import { InterceptorService } from './interceptor.service';

describe('InterceptorService', () => {
  let service: InterceptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterceptorService],
    }).compile();

    service = module.get<InterceptorService>(InterceptorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
