import { ZodError, z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import * as estados from '@/server/utils/json/estados.json';
import * as municipios from '@/server/utils/json/municipios.json';
const schema = z.object({
  cityId: z.string(),
  stateId: z.string(),
})
type ISchema = z.infer<typeof schema>;

export default defineEventHandler(async (event) => {
  try {
    const body = getQuery(event) as ISchema;
    schema.parse(body)

    const cityData = municipios.data?.filter(municipio => municipio.Id === +body.cityId)?.at(0) ?? sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: `City not found`,
      })
    );
    const stateData = estados.data?.filter(estado => estado.Id === +body.stateId)?.at(0) ?? sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: `State not found`,
      })
    );
    if (stateData?.Uf !== cityData?.Uf) sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: `Invalid Address`,
      })
    );
    return { cityData, stateData }
  } catch (error) {
    if (error instanceof ZodError)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        })
      );
  }
})