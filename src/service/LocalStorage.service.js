export class LocalStorageService {
    static setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static getUser() {
        return JSON.parse(localStorage.getItem('user')) || {};
    }

    static removeUser() {
        localStorage.removeItem('user');
    }

    static #getFavorites() {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : {};
    }

    static getFavoritesCurrentUser() {
        const favorites = this.#getFavorites();
        const user = this.getUser();

        return favorites[user.id] || [];
    }

    static toggleFavorites(itemId) {
        const favorites = this.#getFavorites();
        const user = this.getUser();

        let currentUserFavorites = favorites[user.id] || [];

        if (currentUserFavorites.length === 0) {
            currentUserFavorites.push(itemId);
            favorites[user.id] = currentUserFavorites;
            this.#saveToFavorites(favorites);
            return;
        }

        if (currentUserFavorites.includes(itemId)) {
            favorites[user.id] = currentUserFavorites.filter((id) => id !== itemId);

            this.#saveToFavorites(favorites);
            return;
        }
        currentUserFavorites.push(itemId);

        this.#saveToFavorites(favorites);
    }

    static #saveToFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
