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

type TItem = { id: string, quantity: number }
type TCart = { [key: string]: Array<TItem> }

declare global { ILoginParams, IItem, IAddress };