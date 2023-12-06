import * as estados from "@/server/utils/json/estados.json";

export default defineEventHandler((event) => {
  // Todo: Fix types and validation
  const { uf } = event.context.params as { uf: string };
  if (uf === "undefined") {
    return {
      Id: 0,
      CodigoUf: 0,
      Nome: "",
      Uf: "",
      Regiao: 0,
    };
  }
  return (
    estados.data?.filter((estado) => estado.Uf === uf)?.at(0) ??
    sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "State not found :(",
      }),
    )
  );
});
