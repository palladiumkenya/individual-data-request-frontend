import { writable } from 'svelte/store';
import { userManager } from './oidcConfig';

const createAuthStore = () => {
    const { subscribe, set } = writable(null);

    return {
        subscribe,
        login: () => userManager.signinRedirect(),
        logout: () => userManager.signoutRedirect(),
        setUser: (user) => set(user),
    };
};

export const auth = createAuthStore();