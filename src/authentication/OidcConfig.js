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




