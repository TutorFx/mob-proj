import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import formidable from "formidable";
import { useSchemas } from "~/composables/useSchemas";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string;
  const { uuid } = useSchemas;
  const session = await getPrivateSession(event);

  const form = formidable({});
  const response: { fields: formidable.Fields; files: formidable.Files } =
    await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve({ fields, files });
      });
    });

  try {
    const { files } = response;
    uuid.parse(id);
    uuid.parse(session.id);

    const business = await getBusinessById(id);
    if (!business) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `Business with ID ${id} not found`,
        }),
      );
    }
    // Usuário autenticado tem permissão?
    if (business.OwnerId !== session.id) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `User with ID ${session.user.email} is not the owner of business ${business.name}`,
        }),
      );
    }

    await Promise.all(
      Object.keys(files).map(async (key: string) => {
        const file = files[key];

        if (file instanceof Array) {
          return;
        }

        const { Key } = await uploadToS3(file);
        // const { bytes, secure_url, original_filename, public_id, etag } = await uploadToCloudinary(file.filepath)
        await prisma.image.create({
          data: {
            Key,
            bytes: file.size,
            businessId: business.id,
          },
        });
      }),
    );

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
