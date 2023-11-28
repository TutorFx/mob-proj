const { address } = useSchemas;

export type TAddress = z.infer<typeof address>;
