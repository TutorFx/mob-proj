export default defineEventHandler(async (event) => {
  const user = await event.context.session;
  try {
    const getBusiness = await getBusinessByOwnerId(user.id);

    if (getBusiness.length === 0) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: "Business not found",
        }),
      );
    }

    return getBusiness;
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "Businesses not found",
      }),
    );
  }
});
