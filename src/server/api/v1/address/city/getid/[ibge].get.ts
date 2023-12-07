import * as municipios from "@/server/utils/json/municipios.json";

export default defineEventHandler((event) => {
  const { ibge } = event.context.params as { ibge: string };
  if (ibge === "undefined") {
    return {
      Id: 0,
      Codigo: 0,
      Nome: "",
      Uf: "",
    };
  }
  return (
    municipios.data?.filter((municipio) => municipio.Codigo === +ibge)?.at(0) ??
    sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "State not found :(",
      }),
    )
  );
});
