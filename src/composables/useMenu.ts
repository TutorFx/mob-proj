import { RouteLocationRaw } from "#vue-router";

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

const StoreDashboard = [
  {
    icon: "mdi:view-dashboard-outline",
    title: "Informações",
    to: { name: "dashboard-id" }
  },
  {
    icon: "mdi:view-grid-outline",
    title: "Produtos",
    to: { name: "dashboard-id-produto" }
  },
  {
    icon: "mdi:view-grid-plus-outline",
    title: "Novo Produto",
    to: { name: "dashboard-id-produto-novo" }
  },
  {
    icon: "mdi:store-settings-outline",
    title: "Perfil da Empresa",
    to: { name: "dashboard-id-profile" }
  },
  {
    icon: "mdi:basket-fill",
    title: "Fechamentos",
    to: { name: "dashboard-id-fechamento" }
  }
]

const AdminDashboard = [
  {
    icon: "ic:outline-business-center",
    title: "Empresas",
    to: { name: "dashboard-admin" }
  }
]

export type MenuType = {
  icon?: string,
  title: string,
  to: RouteLocationRaw,
}

export type MenuItems = MenuType[]

interface MenuTypeObject<T> {
  [key: string]: T[];
}

const menu = {
  home,
  StoreDashboard,
  AdminDashboard
}

export const useMenu = (item: keyof typeof menu): MenuItems => {
  return menu[item]
}