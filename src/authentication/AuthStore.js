import { writable } from 'svelte/store';
import { userManager } from './OidcConfig';



const createAuthStore = () => {
    const user = writable(null);
    const isAuthenticated = writable(false);

    return {
        subscribe: user.subscribe,
        login: () => {
            // Your logic for logging in (e.g., using OIDC or another method)
            userManager.signinRedirect();
        },
        logout: () => {
            // Your logic for logging out
            userManager.signoutRedirect();
            user.set(null);
            isAuthenticated.set(false);
        },
        setUser: (userData) => {
            user.set(userData);
            isAuthenticated.set(!!userData); // Set to true if userData is not null
        },
        setIsAuthenticated: (authState) => {
            isAuthenticated.set(authState);
        },
        user, // Expose the isAuthenticated store
    };
};

export const auth = createAuthStore();
