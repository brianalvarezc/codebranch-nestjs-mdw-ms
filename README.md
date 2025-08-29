# Proyecto: codebranch-nestjs-mdw-ms

Este proyecto implementa un microservicio en **NestJS** siguiendo principios de Clean Architecture, con soporte para validación, caching, integración con microservicios externos y flujos reactivos usando RxJS.

## 📌 Características
- Arquitectura modular y desacoplada (application, domain, infrastructure)
- Validación robusta de DTOs con `class-validator` y `class-transformer`
- Caching en memoria para optimizar llamadas repetidas
- Integración con microservicios vía HTTP usando `@nestjs/axios`
- Flujos reactivos con RxJS (`Observable`, operadores)
- Documentación automática con Swagger
- Testing unitario con Jest

## 📂 Estructura del Proyecto
```
.
├── src/
│   ├── app.module.ts                # Módulo principal NestJS
│   ├── main.ts                      # Bootstrap de la app
│   ├── config/                      # Configuración (env, openApi)
│   │   ├── envs.config.ts
│   │   ├── openApi.config.ts
│   │   └── index.ts
│   └── interceptor/
│       ├── interceptor.module.ts    # Módulo interceptor
│       ├── application/
│       │   └── use-cases/           # Casos de uso
│       │       ├── cache-request.usecase.ts
│       │       ├── map-response.usecase.ts
│       │       └── validate-coordinates.usecase.ts
│       ├── domain/
│       │   └── entities/            # Entidades de dominio
│       │       ├── coordinates.entity.ts
│       │       ├── point.entity.ts
│       │       └── processedCoordinates.entity.ts
│       ├── infrastructure/
│       │   └── controller/          # Controlador HTTP
│       │       ├── interceptor.controller.ts
│       │       └── interceptor.controller.spec.ts
│       └── service/
│           ├── cache.service.ts     # Servicio de caché
│           ├── interceptor.service.ts
│           ├── interceptor.service.spec.ts
│           ├── microserviceClient.service.ts
│           ├── dto/                 # DTOs
│           │   ├── bounds.dto.ts
│           │   ├── coordinates.dto.ts
│           │   ├── errorResponse.dto.ts
│           │   ├── points.dto.ts
│           │   └── processedCoordinates.dto.ts
│           └── mapper/
│               └── points.mapper.ts
├── test/
│   ├── app.e2e-spec.ts              # Pruebas end-to-end
│   └── jest-e2e.json                # Configuración Jest e2e
├── Dockerfile                       # Imagen Docker multi-stage
├── .dockerignore                    # Exclusiones para Docker
├── package.json                     # Dependencias y scripts
├── README.md                        # Documentación
└── ...
```

## 🚀 Instalación Local

1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd codebranch-nestjs-mdw-ms
   ```

2. Instala las dependencias:
   ```sh
   npm ci
   # o si usas pnpm:
   # pnpm install --frozen-lockfile
   ```

3. (Solo para producción) Compila el proyecto:
   ```sh
   npm run build
   ```
   > No es necesario ejecutar `npm run build` para desarrollo, ya que `npm run start:dev` transpila y ejecuta el código en tiempo real.

4. Inicia el microservicio:
   - Para desarrollo (hot-reload):
     ```sh
     npm run start:dev
     ```
   - Para producción (requiere build previo):
     ```sh
     npm run start:prod
     ```

## 🐳 Uso con Docker o Podman

1. Construye la imagen:
   ```sh
   docker build -t codebranch-nestjs-mdw-ms:latest .
   podman build -t codebranch-nestjs-mdw-ms:latest .
   ```

2. Ejecuta el contenedor:
   ```sh
   docker run --rm -p 3000:3000 codebranch-nestjs-mdw-ms:latest
   podman run --rm -p 3000:3000 codebranch-nestjs-mdw-ms:latest
   ```
   > El puerto por defecto es 3000, puedes cambiarlo con la variable de entorno `PORT`.

## 🧪 Testing

Las pruebas unitarias se ejecutan con Jest.

1. Ejecuta los tests:
   ```sh
   npm test
   ```

2. Para ver cobertura:
   ```sh
   npm run test:cov
   ```

## 📝 Notas
- El caché normaliza los puntos de coordenadas para evitar duplicados por orden.
- La documentación Swagger está disponible en `/docs` si se habilita en el módulo principal.
- Usa variables de entorno para configuración sensible (`.env`).
- El Dockerfile está optimizado para imágenes pequeñas y seguras (multi-stage, usuario no-root).
- `.dockerignore` excluye archivos innecesarios para el build.

## 📋 Licencia
Este proyecto está bajo la licencia **LICENCIA**.
