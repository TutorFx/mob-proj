import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import formidable from "formidable";
import { useSchemas } from "~/composables/useSchemas";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const { uuid } = useSchemas;
  const session = await event.context.session;

  const form = formidable({});
  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ files });
    });
  });

  try {
    const { files }: { files: any } = response as { files: any };
    uuid.parse(id);
    uuid.parse(session.id);

    const business = await prisma.business.findUnique({
      where: {
        id,
      },
    });
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
      Object.keys(files).map(async (key: any) => {
        const file = files[key];
        const { Key } = await uploadToS3(file);
        // const { bytes, secure_url, original_filename, public_id, etag } = await uploadToCloudinary(file.filepath)
        await prisma.image.create({
          data: {
            Key,
            bytes: file.bytes,
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
