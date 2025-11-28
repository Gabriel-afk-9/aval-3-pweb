
export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  languages?: { [key: string]: string };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  cca3: string;
  cca2: string;
  idd?: {
    root?: string;
    suffixes?: string[];
  };
  timezones?: string[];
  borders?: string[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
}

const BASE_URL = 'https://restcountries.com/v3.1';

const FIELDS = 'name,capital,region,subregion,population,area,flags,languages,currencies,cca3';

class CountryService {
  private cache: { [key: string]: { data: Country[], timestamp: number } } = {};
  private CACHE_DURATION = 5 * 60 * 1000;

  private async fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<Response> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        
        if (response.ok) {
          return response;
        }
        
        if (response.status === 429) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1) * 2));
          continue;
        }
        
        if (response.status === 404) {
          return response;
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
    throw new Error('Falha após múltiplas tentativas');
  }

  private getFromCache(key: string): Country[] | null {
    const cached = this.cache[key];
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private saveToCache(key: string, data: Country[]): void {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }

  async searchByName(name: string): Promise<Country[]> {
    if (!name.trim()) {
      return this.getAllCountries();
    }
    
    const cacheKey = `name_${name.toLowerCase()}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;
    
    try {
      const response = await this.fetchWithRetry(
        `${BASE_URL}/name/${encodeURIComponent(name)}?fields=${FIELDS}`
      );
      
      if (response.status === 404) return [];
      if (!response.ok) throw new Error('Erro ao buscar países');
      
      const data = await response.json();
      this.saveToCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Erro na busca por nome:', error);
      return [];
    }
  }

  async filterByRegion(region: string): Promise<Country[]> {
    if (region === 'all') {
      return this.getAllCountries();
    }
    
    const cacheKey = `region_${region.toLowerCase()}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;
    
    try {
      const response = await this.fetchWithRetry(
        `${BASE_URL}/region/${encodeURIComponent(region)}?fields=${FIELDS}`
      );
      
      if (!response.ok) throw new Error('Erro ao filtrar por região');
      
      const data = await response.json();
      this.saveToCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Erro no filtro por região:', error);
      return [];
    }
  }

  async getAllCountries(): Promise<Country[]> {
    const cacheKey = 'all_countries';
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }
    
    try {
      console.log('Carregando países da API...');
      const response = await this.fetchWithRetry(`${BASE_URL}/all?fields=${FIELDS}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(` ${data.length} países carregados com sucesso`);
      this.saveToCache(cacheKey, data);
      return data;
    } catch (error) {
      
      if (this.cache[cacheKey]) {
        return this.cache[cacheKey].data;
      }
      
      throw error;
    }
  }

  async getCountryByCode(code: string): Promise<Country | null> {
    try {
      const response = await this.fetchWithRetry(`${BASE_URL}/alpha/${code}?fields=${FIELDS}`);
      if (!response.ok) return null;
      const data = await response.json();
      return Array.isArray(data) ? data[0] : data;
    } catch (error) {
      console.error('Erro ao buscar país por código:', error);
      return null;
    }
  }

  clearCache(): void {
    this.cache = {};
  }
}

export const countryService = new CountryService();