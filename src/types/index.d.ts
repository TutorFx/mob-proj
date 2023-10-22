type IObjectStatus = {
  [key: string]: string;
}
interface ILoginParams {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  confirmemail?: string;
  password: string;
}

type IProductForm = {
  name: string;
  description: string;
  price: number;
  files: Array<File>
}

type INav = {
  slug: string;
  name: string;
  logo_url: string;
  id: string;
} | null;

type IAddress = {
  cep: string;
  endereco: string;
  numero: number | null;
  bairro: string;
  estado: number;
  cidade: number;
  complemento: string;
}

type IViacep = {
  logradouro: string;
  complemento: string;
  bairro: string;
  uf: string;
  localidade: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

type TokenData = {
  id: string;
  nome: string | null;
  email: string;
  isCostumer: boolean;
}

type validateToken = {
  id: string;
  nome: string | null;
  email: string;
  plan: string;
  iat: number;
  exp: number;
  isCostumer: boolean;
}

type Session = {
  user: { nome: string | null; email: string; plan: string; isCostumer: boolean;}
  id: string;
}

type MenuItem = {
  title: string,
  to: RouteLocationRaw,
}

type MenuItems = MenuItem[]

type ValidateResponse = { user: Session, token: string }

type TItem = { id: string, quantity: number }
export type TCart = { [key: string]: Array<TItem> }

declare global { ILoginParams, IItem, IAddress, IObjectStatus };