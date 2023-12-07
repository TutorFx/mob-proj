export * from "~repository/index.d.ts";

export type IObjectStatus = {
  [key: string]: string;
};
export interface ILoginParams {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  confirmemail?: string;
  password: string;
}

export type IProductForm = {
  name: string;
  description: string;
  price: number;
  files: Array<File>;
};

export type INav = {
  slug: string;
  name: string;
  logo_url: string;
  id: string;
} | null;

export type IAddress = {
  cep: string;
  endereco: string;
  numero: number | null;
  bairro: string;
  estado: number;
  cidade: number;
  complemento: string;
};

export type IViacep = {
  logradouro: string;
  complemento: string;
  bairro: string;
  uf: string;
  localidade: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export type TokenData = {
  id: string;
  nome: string | null;
  email: string;
  isCostumer: boolean;
};

export type IValidateToken = {
  id: string;
  nome: string | null;
  email: string;
  plan: string;
  role: string;
  iat: number;
  exp: number;
  isCostumer: boolean;
};

export type ValidateResponse = { user: Session; token: string };

export type TItem = { id: string; quantity: number };
export type TCart = { [key: string]: Array<IUseSchemas["cartItem"]> };

declare global {
  ILoginParams, IItem, IAddress, IObjectStatus;
}
