const FAVORITES_KEY = "globalInsights_favorites";

export const favoritesStorage = {
  getFavorites(): string[] {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("error to load favorite:", error);
      return [];
    }
  },

  saveFavorites(favorites: string[]): void {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("error to save favorite:", error);
    }
  },

  addFavorite(countryCode: string): string[] {
    const favorites = this.getFavorites();
    if (favorites.includes(countryCode)) return favorites;

    favorites.push(countryCode);
    this.saveFavorites(favorites);

    return favorites;
  },

  removeFavorite(countryCode: string): string[] {
    const favorites = this.getFavorites().filter(
      (code) => code !== countryCode
    );
    this.saveFavorites(favorites);
    return favorites;
  },

  toggleFavorite(countryCode: string): string[] {
    const favorites = this.getFavorites();

    favorites.includes(countryCode)
      ? this.removeFavorite(countryCode)
      : this.addFavorite(countryCode);

    return favorites;
  },

  isFavorite(countryCode: string): boolean {
    return this.getFavorites().includes(countryCode);
  },
};
