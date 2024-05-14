import { config } from 'dotenv';
import Joi from 'joi';

config();

const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  MONGO_URL: Joi.string().required(),
  JWT_KEY: Joi.string().required().default('mysecretkey'),
}).unknown().required();

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment variable validation error: ${error.message}`);
}

export const port = value.PORT;
export const mongo_url = value.MONGO_URL;
export const jwtkey = value.JWT_KEY;