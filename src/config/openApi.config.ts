import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class OpenApi {
  public static swaggerConfig(app: INestApplication) {
    const config = new DocumentBuilder()
      .addBasicAuth()
      .setTitle('Geo-Processor API Middleware')
      .setDescription('API para manejar las request para procesar coordenadas geográficas')
      .setExternalDoc('Postman Collection', '')
      .setVersion('1.0')
      .build();

    return SwaggerModule.createDocument(app, config);
  }
}
