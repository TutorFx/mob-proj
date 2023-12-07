import * as estados from "@/server/utils/json/estados.json";

export default defineEventHandler(() => {
  return estados.data;
});
