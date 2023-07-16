export const useStatusPreset = (status: string) => ({
  'NEW': { name: 'NOVO', color: 'rose-400', message: 'seu pedido está em análise' },
  'PENDING': { name: 'PENDENTE', color: 'amber-400', message: 'seu pedido está a caminho' },
  'DELIVERED': { name: 'ENTREGUE', color: 'emerald-200', message: 'seu pedido foi entregue' },
  'PRODUCING': { name: 'PRODUZINDO', color: 'sky-400', message: 'seu pedido está em produção' },
})[status]