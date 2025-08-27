import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { env, OpenApi } from './config';
import { SwaggerModule } from '@nestjs/swagger';


async function main() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  
  app.enableCors();
  app.setGlobalPrefix(`${env.controllerPath}`);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  const document = OpenApi.swaggerConfig(app);
  SwaggerModule.setup('/docs', app, document);
  
  await app.listen(env.port, '0.0.0.0');
};
  
main();