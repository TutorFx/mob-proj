interface ILoginParams {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  confirmemail?: string;
  password: string;
}

interface IBusinessCreate {
  name: string;
  slug: string;
}

declare global {ILoginParams};