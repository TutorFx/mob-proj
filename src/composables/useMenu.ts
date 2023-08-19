import { MenuItems } from "~/types"

const home = [
  {
    title: "Benefícios",
    to: { path: "/", hash: "#beneficios" }
  },
  {
    title: "Nossos Clientes",
    to: { path: "/", hash: "#nossos-clientes" }
  },
  {
    title: "Preço",
    to: { path: "/", hash: "#preco" }
  }
]

export const useMenu = (item: string): MenuItems | undefined => {
  return {
    home,
  }[item]
}