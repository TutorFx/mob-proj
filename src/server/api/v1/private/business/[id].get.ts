export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string;
  const { uuid } = useSchemas;
  try {
    uuid.parse(id);
    const getBusiness = await getBusinessProfileById(id);

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
