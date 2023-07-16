import { Address } from "@prisma/client";

export class AddressFormatter {
  cep: string;
  estado?: string;
  cidade?: string;
  endereco: string;
  bairro: string;
  numero: number | null;
  complemento: string;

  estadoId: number;
  cidadeId: number;

  constructor(address?: Address) {
    try {
      if (address) {
        this.cep = address.cep;
        this.endereco = address.endereco;
        this.bairro = address.bairro;
        this.numero = address.numero;
        this.complemento = address.complemento;
        this.estadoId = address.estado;
        this.cidadeId = address.cidade;
      } else throw createError({
        statusCode: 404,
        statusMessage: 'Invalid Address'
      })
    } catch (error) {
      console.log(error)
      throw createError({
        statusCode: 404,
        statusMessage: 'Dados de endereço não encontrados'
      })
    }
  }

  async fetch() {
    const response = await $fetch('/api/v1/address/', { query: { cityId: this.cidadeId, stateId: this.estadoId } });
    this.cidade = response.cityData.Nome;
    this.estado = response.stateData.Nome;
  }
}