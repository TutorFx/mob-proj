import redisDriver from "unstorage/drivers/redis";
import type { ExtendedRuntimeConfig } from "@/types";

export default defineNitroPlugin(() => {
  const storage = useStorage();

  const config = useRuntimeConfig() as unknown as ExtendedRuntimeConfig;

  const driver = redisDriver({
    base: "redis",
    host: config.redis.host,
    port: config.redis.port,
    username: config.redis.username,
    password: config.redis.password,
  });

  storage.mount("redis", driver);
});
