import { Prisma, PrismaClient } from "@prisma/client";
import type { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import formidable from "formidable";
import { useSchemas } from "~/composables/useSchemas";
import { uploadToS3 } from "@/server/utils";

const prisma = new PrismaClient();
const { createProductSchema } = useSchemas;
type IProductSchema = z.infer<typeof createProductSchema>;

export default defineEventHandler(async (event) => {
  const session = await event.context.session;
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

  const { fields, files } = response;
  const body: IProductSchema = JSON.parse(
    ((fields) => (Array.isArray(fields) ? fields[0] : fields))(fields.fields),
  );

  try {
    createProductSchema.parse(body);
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
        statusCode: 500,
        statusMessage: "Unknown error",
      }),
    );
  }
  if (session?.user?.email == null || session?.id == null) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Invalid User",
      }),
    );
  }
  try {
    const { name, description, price, businessId } = body;

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { Owner: true },
    });

    if (!business) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `Business with ID ${businessId} not found`,
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

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        businessId,
        userId: session.id,
      },
    });

    await Promise.all(
      Object.keys(files).map(async (key: string) => {
        try {
          const file = files[key] as formidable.File;
          const { ETag, Key } = await uploadToS3(file);
          if (!Key || !ETag) {
            return;
          }
          // const { bytes, secure_url, original_filename, public_id, etag } = await uploadToCloudinary(file.filepath)
          await prisma.image.create({
            data: {
              Key,
              bytes: file.size,
              productId: product.id,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }),
    );

    return product;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return sendError(
        event,
        createError({
          statusCode: 204,
          statusMessage: "Nao pode fazer entrada",
        }),
      );
    }

    console.log(error);
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "bugou",
      }),
    );
  }
});
