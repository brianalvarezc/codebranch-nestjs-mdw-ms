import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  PORT: number;
  CONTROLLER_PATH: string;
  AUTH_USER: string;
  AUTH_PASSWORD: string;
  MICROSERVICE_URL: string;
  MICROSERVICE_PATH: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    CONTROLLER_PATH: joi.string().required(),
    AUTH_USER: joi.string().required(),
    AUTH_PASSWORD: joi.string().required(),
    MICROSERVICE_URL: joi.string().uri().required(),
    MICROSERVICE_PATH: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config value error ${error.message}`);

const envVars: EnvVars = value;

export const env = {
  port: envVars.PORT,
  controllerPath: envVars.CONTROLLER_PATH,
  authUser: envVars.AUTH_USER,
  authPassword: envVars.AUTH_PASSWORD,
  microServiceUrl: envVars.MICROSERVICE_URL,
  microServicePath: envVars.MICROSERVICE_PATH,
};
