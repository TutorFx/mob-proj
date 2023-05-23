interface ILoginParams {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  confirmemail?: string;
  password: string;
}

type IFile = {
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: "image" | "video" | "raw" | "auto";
  created_at: string;
  bytes: number;
  placeholder: boolean;
  url: string;
  original_filename: string;
  colors?: [string, number][];
}

type IProductForm = {
  name: string;
  description: string;
  price: number;
  files: Array<File | IFile>
}

declare global {ILoginParams};