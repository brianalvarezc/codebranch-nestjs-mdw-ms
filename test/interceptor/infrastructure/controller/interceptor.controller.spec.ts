import { of } from 'rxjs';
import { InterceptorController } from '@src/interceptor/infrastructure/controller/interceptor.controller';
import { InterceptorService } from '@src/interceptor/service/interceptor.service';

describe('InterceptorController', () => {
  let controller: InterceptorController;

  beforeEach(() => {
    const mockService: Partial<InterceptorService> = {
      create: jest.fn().mockReturnValue(of({})),
    };

    controller = new InterceptorController(mockService as InterceptorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});