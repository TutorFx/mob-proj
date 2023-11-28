import * as municipios from "@/server/utils/json/municipios.json";
import * as estados from "@/server/utils/json/estados.json";

export default defineEventHandler((event) => {
  const { id } = event.context.params;
  const estadoData =
    estados.data?.filter((estado) => estado.Id === +id)?.at(0) ??
    sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "State not found :(",
      }),
    );
  return municipios.data?.filter(
    (municipio) => municipio.Uf === estadoData?.Uf,
  );
});
