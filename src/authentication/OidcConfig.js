import {UserManager, WebStorageStateStore} from 'oidc-client-ts';



let client_id = "dwh.sop-portal"
let authority = 'https://identity.kenyahmis.org'
let BASE_URL = 'http://localhost:5000'


const config = {
    authority: authority,
    client_id: client_id,
    redirect_uri: "http://localhost:5000/signin-oidc",
    response_type: "code",
    scope: "openid profile apiApp",
    post_logout_redirect_uri: "http://localhost:5000/admin/dashboard",
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,
    loadUserInfo: true,
    // Enable PKCE
    usePkce: true,
    extraQueryParams: { response_mode: 'query' }
}

export const userManager = new UserManager(config);


// export function signinRedirect() {
//     return userManager.signinRedirect();
// }
//
// export function signinRedirectCallback() {
//     if (window.location.hash) {
//         try {
//             sessionStorage.setItem("isAuthenticated", "true");
//             return userManager.signinRedirectCallback();
//         }
//         catch (e) {
//             console.log(e);
//         }
//     } else {
//         return userManager.signinRedirectCallback();
//
//     }
// }
//
// export async function signoutRedirect() {
//     let user = await userManager.getUser();
//     await userManager.clearStaleState();
//     await userManager.removeUser();
//     return userManager.signoutRedirect({ 'id_token_hint': user.id_token });
// }
//
// export function signoutRedirectCallback() {
//     userManager.clearStaleState();
//     userManager.removeUser();
//     return userManager.signoutRedirectCallback();
// }

// export default userManager;


