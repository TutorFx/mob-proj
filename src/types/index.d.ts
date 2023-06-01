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
}

type TItem = { id: string, quantity: number }
type TCart = { [key: string]: Array<TItem> }

declare global {ILoginParams};