import { of } from 'rxjs';
import { InterceptorService } from '@src/interceptor/service/interceptor.service';

describe('InterceptorService', () => {
  let service: InterceptorService;

  beforeEach(() => {
    const mockValidate = { execute: jest.fn().mockReturnValue(of(true)) } as any;
    const mockCache = { get: jest.fn().mockReturnValue(of(null)), set: jest.fn() } as any;
    const mockMicro = { send: jest.fn().mockReturnValue(of({})) } as any;

    service = new InterceptorService(mockValidate, mockCache, mockMicro);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
