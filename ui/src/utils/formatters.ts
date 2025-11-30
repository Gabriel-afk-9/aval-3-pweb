export const formatters = {
  number(num: number): string {
    return new Intl.NumberFormat('pt-BR').format(num);
  },

  population(pop: number): string {
    if (pop >= 1000000000) return `${(pop / 1000000000).toFixed(2)} bilhões`;
    
    if (pop >= 1000000) return `${(pop / 1000000).toFixed(2)} milhões`;
    
    if (pop >= 1000) return `${(pop / 1000).toFixed(2)} mil`;
    
    return pop.toString();
  },

  area(area: number): string {
    return `${this.number(area)} km²`;
  },

  list(items: string[]): string {
    if (items.length === 0) return 'N/A';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} e ${items[1]}`;
    
    return `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`;
  }
};