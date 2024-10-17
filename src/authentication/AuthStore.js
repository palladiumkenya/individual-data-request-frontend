import { writable } from 'svelte/store';
import { userManager } from './OidcConfig';

// Helper function to create a writable store with persistence
const persist = (key, initialValue) => {
    const storedValue = localStorage.getItem(key);
    const store = writable(storedValue ? JSON.parse(storedValue) : initialValue);

    store.subscribe((value) => {
        if (value !== null) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.removeItem(key); // Clear storage on null value
        }
    });

    return store;
};

const createAuthStore = () => {
    const user = writable(null);
    const isAuthenticated = writable(false);
    const id = persist('userId',null)

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
            id.set(null)
        },
        setUser: (userData) => {
            user.set(userData);
            isAuthenticated.set(!!userData); // Set to true if userData is not null
        },
        setIsAuthenticated: (authState) => {
            isAuthenticated.set(authState);
        },
        setUserId: (userId) =>{
            id.set(userId)
        },
        user, // Expose the isAuthenticated store
        id,
    };
};

export const auth = createAuthStore();
