import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { InterceptorModule } from '../src/interceptor/interceptor.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    const appModule = module.get(AppModule);
    expect(appModule).toBeDefined();
  });

  it('should import InterceptorModule', () => {
    const imports = Reflect.getMetadata('imports', AppModule);
    expect(imports).toContain(InterceptorModule);
  });
});