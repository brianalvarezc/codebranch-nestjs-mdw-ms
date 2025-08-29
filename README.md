
# Project: codebranch-nestjs-mdw-ms

This project implements a microservice in **NestJS** following Clean Architecture principles, with support for validation, caching, integration with external microservices, and reactive flows using RxJS.

## 📌 Features
- Modular and decoupled architecture (application, domain, infrastructure)
- Robust DTO validation with `class-validator` and `class-transformer`
- In-memory caching to optimize repeated calls
- Integration with microservices via HTTP using `@nestjs/axios`
- Reactive flows with RxJS (`Observable`, operators)
- Automatic documentation with Swagger
- Unit testing with Jest

## 📂 Project Structure
```
.
├── src/
│   ├── app.module.ts                # Main NestJS module
│   ├── main.ts                      # App bootstrap
│   ├── config/                      # Configuration (env, openApi)
│   │   ├── envs.config.ts
│   │   ├── openApi.config.ts
│   │   └── index.ts
│   └── interceptor/
│       ├── interceptor.module.ts    # Interceptor module
│       ├── application/
│       │   └── use-cases/           # Use cases
│       │       ├── cache-request.usecase.ts
│       │       ├── map-response.usecase.ts
│       │       └── validate-coordinates.usecase.ts
│       ├── domain/
│       │   └── entities/            # Domain entities
│       │       ├── coordinates.entity.ts
│       │       ├── point.entity.ts
│       │       └── processedCoordinates.entity.ts
│       ├── infrastructure/
│       │   └── controller/          # HTTP controller
│       │       ├── interceptor.controller.ts
│       │       └── interceptor.controller.spec.ts
│       └── service/
│           ├── cache.service.ts     # Cache service
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
│   ├── app.e2e-spec.ts              # End-to-end tests
│   └── jest-e2e.json                # Jest e2e configuration
├── Dockerfile                       # Multi-stage Docker image
├── .dockerignore                    # Docker exclusions
├── package.json                     # Dependencies and scripts
├── README.md                        # Documentation
└── ...
```

## 🚀 Local Installation


### ⚙️ Environment Variable Configuration

Before starting the project, copy the `.env.example.txt` file as `.env` in the root of the repository and customize the values according to your environment:

```sh
cp .env.example.txt .env
```

Make sure to adjust the variable values (port, paths, credentials, microservice URLs, etc.) according to your local or deployment configuration.

1. Clone the repository:
   ```sh
   git clone <REPOSITORY_URL>
   cd codebranch-nestjs-mdw-ms
   ```

2. Install dependencies:
   ```sh
   npm ci
   # or if you use pnpm:
   # pnpm install --frozen-lockfile
   ```

3. (Production only) Build the project:
   ```sh
   npm run build
   ```
   > You do not need to run `npm run build` for development, as `npm run start:dev` transpiles and runs the code in real time.

4. Start the microservice:
   - For development (hot-reload):
     ```sh
     npm run start:dev
     ```
   - For production (requires prior build):
     ```sh
     npm run start:prod
     ```

## 🐳 Usage with Docker or Podman

1. Build the image (you can specify the default port with ARG):
   ```sh
   docker build -t codebranch-nestjs-mdw-ms:latest --build-arg PORT=3000 .
   podman build -t codebranch-nestjs-mdw-ms:latest --build-arg PORT=3000 .
   ```
   > If `--build-arg PORT=xxxx` is not specified, the default value defined in the Dockerfile (`ARG PORT=3000`) will be used.

2. Run the container (you can change the port with the environment variable):
   ```sh
   docker run --rm -p 8080:8080 -e PORT=8080 codebranch-nestjs-mdw-ms:latest
   podman run --rm -p 8080:8080 -e PORT=8080 codebranch-nestjs-mdw-ms:latest
   ```
   > If `-e PORT=xxxx` is not specified, the default value defined in the Dockerfile or the `.env` inside the image will be used.
   > The default exposed port is 3000, but you can map any external port with `-p` and change the internal one with `-e PORT=xxxx`.


## 🧪 Testing

Unit tests are run with Jest.

1. Run the tests:
   ```sh
   npm test
   ```

2. To view coverage:
   ```sh
   npm run test:cov
   ```

## 📝 Notes
- The cache normalizes coordinate points to avoid duplicates by order.
- Swagger documentation is available at `/docs` if enabled in the main module.
- Use environment variables for sensitive configuration (`.env`).
- The Dockerfile is optimized for small and secure images (multi-stage, non-root user).
- `.dockerignore` excludes unnecessary files for the build.

## 📋 License
This project is licensed under **LICENSE**.

## 📚 API Endpoints

### Process Coordinates
- **Endpoint:** `POST /interceptor`
- **Description:** Receives a list of points and returns the centroid and geographic bounds. Integrates with an external geoprocessor microservice.

#### Request Body
```json
{
   "points": [
      { "lat": 40.712776, "lng": -74.005974 },
      { "lat": -33.868820, "lng": 151.209296 },
      { "lat": 35.689487, "lng": 139.691711 },
      { "lat": 55.755825, "lng": 37.617298 },
      { "lat": -23.550520, "lng": -46.633308 }
   ]
}
```

#### Successful Response
```json
{
   "centroid": {
      "lat": 14.9477496,
      "lng": 41.5758046
   },
   "bounds": {
      "north": 55.755825,
      "south": -33.86882,
      "east": 151.209296,
      "west": -74.005974
   }
}
```

#### Error Responses
- **400 Bad Request:** Invalid body or malformed points.
   ```json
   {
      "statusCode": 400,
      "message": "Invalid coordinates",
      "error": "The provided coordinates are not valid"
   }
   ```
- **500 Internal Server Error:** External microservice error or unexpected failure.
   ```json
   {
      "statusCode": 500,
      "message": "Error al procesar la solicitud",
      "error": "<detail from external service or error message>"
   }
   ```

#### Example Usage
```bash
curl -X POST "http://localhost:3000/interceptor" \
   -H "Content-Type: application/json" \
   -d '{
      "points": [
         { "lat": 40.712776, "lng": -74.005974 },
         { "lat": -33.868820, "lng": 151.209296 },
         { "lat": 35.689487, "lng": 139.691711 },
         { "lat": 55.755825, "lng": 37.617298 },
         { "lat": -23.550520, "lng": -46.633308 }
      ]
   }'
```
