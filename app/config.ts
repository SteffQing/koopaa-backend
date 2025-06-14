import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string) {
  return process.env[key];
}

const redis = new Redis({
  url: getEnv("UPSTASH_REDIS_REST_URL"),
  token: getEnv("UPSTASH_REDIS_REST_TOKEN"),
});

export { redis, getEnv };
