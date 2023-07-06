export const useMoney = (value: number): string => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(value);
};
export const useMaskRemover = (phone: string): string => {
	return phone?.replace(/[^\d]*/gi,'');
};
export const useGreeting = (): string => {
  let h = +(new Date().toLocaleTimeString('pt-BR', {hour: 'numeric', hour12: false})); // formato 24 horas (0-23)
  if (h >= 0 && h <= 5) { // entre meia noite (0h) e 5 da madrugada
    return 'Boa madrugada';
  } else if (h >= 6 && h < 12) { // entre 6 e 11 da manhã
    return 'Bom dia';
  } else if (h >= 12 && h < 18) { // entre meio dia (12h) e 17 (5h) da tarde
    return 'Boa tarde';
  } else { // entre 18 (6h) e 23 (11h) da noite
    return 'Boa noite';
  }
};