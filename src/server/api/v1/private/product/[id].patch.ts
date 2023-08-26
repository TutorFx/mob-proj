import { uploadToCloudinary } from "@/server/utils"
import { Prisma, PrismaClient, Image } from '@prisma/client';
import { ZodError, z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { useSchemas } from '~/composables/useSchemas';
import formidable from 'formidable';

const prisma = new PrismaClient()
const { editProductSchema, uuid } = useSchemas;
type IProductSchema = z.infer<typeof editProductSchema>;
type IUuid = z.infer<typeof uuid>;

export default defineEventHandler(async (event) => {
  const session = await event.context.session;
  const form = formidable({});
  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
  // @ts-ignore
  const { fields, files } : { fields: any, files: any } = response
  const body : IProductSchema = JSON.parse(fields.fields);
  const id = event.context.params?.id as IUuid;
  try {
    editProductSchema.parse(body)
    uuid.parse(id)
  } catch (error) {
    if (error instanceof ZodError)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        })
      );
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Unknown error'
      })
    );
  }
  if (session?.user?.email == null || session?.id == null) return sendError(
    event,
    createError({
      statusCode: 500,
      statusMessage: 'Invalid User'
    })
  );
  try {
    const { name, description, price, businessId } = body;

    const productBusiness = await prisma.product.findUnique({
      where: {
        id
      },
      select: {
        Business: {
          select: {
            OwnerId: true,
            name: true
          },
        },
        businessId: true
      }
    })

    if (!productBusiness?.Business) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `Business with ID ${businessId} not found`
        })
      )
    }


    // Usuário autenticado tem permissão?
    if (productBusiness?.Business.OwnerId !== session.id) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `User with ID ${session.user.email} is not the owner of business ${productBusiness.Business.name}`
        })
      )
    }

    const product = await prisma.product.update({
      where: {
        id
      },
      data:{
        name, 
        description, 
        price,
        userId: session.id,
      }
    })

    await Promise.all(Object.keys(files).map(async (key: any) => {
      const file = files[key]
      const { $metadata, ETag, Key } = await uploadToS3(file)
      const { requestId, extendedRequestId } = $metadata;
      if (!Key || !ETag) return;
      //const { bytes, secure_url, original_filename, public_id, etag } = await uploadToCloudinary(file.filepath)
      await prisma.image.create({
        data:{
          Key,
          bytes: file.bytes,
          productId: product.id,
        }
      })
    }))
    
    return product;

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
      return sendError(
        event,
        createError({
          statusCode: 204,
          statusMessage: 'Nao pode fazer entrada'
        })
      );

    console.log(error)
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'bugou'
      })
    );
  }
})