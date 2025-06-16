import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string) {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable [${key}] is not defined`);
  }
  return value;
}

const resend = new Resend(getEnv("RESEND_APIKEY"));

const redis = new Redis({
  url: getEnv("UPSTASH_REDIS_REST_URL"),
  token: getEnv("UPSTASH_REDIS_REST_TOKEN"),
});

export { redis, getEnv, resend };
