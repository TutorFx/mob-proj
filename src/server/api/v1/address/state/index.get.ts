import * as estados from "@/server/utils/json/estados.json";

export default defineEventHandler((event) => {
  return estados.data;
});
