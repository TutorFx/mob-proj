import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export default defineEventHandler(async (event) => {
  const params = event.context.params as IUseSchemas["updateTheme"];
  const { uuid, updateTheme } = useSchemas;
  const session = await getPrivateSession(event);

  try {
    uuid.parse(session.id);
    updateTheme.parse(params);

    const business = await getBusinessById(params.id);
    if (!business) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `Business with ID ${params.id} not found`,
        }),
      );
    }
    // Usuário autenticado tem permissão?
    if (business.OwnerId !== session.id) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `User with ID ${session.user.email} is not the owner of business ${business.name}`,
        }),
      );
    }

    await setBusinessTheme(business.id, params.theme);

    return { status: "Sucess" };
  } catch (error) {
    if (error instanceof ZodError) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        }),
      );
    }
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "Businesses not found",
      }),
    );
  }
});
