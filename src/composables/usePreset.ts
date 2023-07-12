export const useStatusPreset = (status: string) => ({
  'NEW': { name: 'NOVO', color: 'rose-400' },
  'PENDING': { name: 'PENDENTE', color: 'amber-400' },
  'DELIVERED': { name: 'ENTREGUE', color: 'emerald-200' },
  'PRODUCING': { name: 'PRODUZINDO', color: 'sky-400' },
})[status]