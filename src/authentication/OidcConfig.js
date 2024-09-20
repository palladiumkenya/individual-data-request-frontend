import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

const env = process.env.config;

let client_id = env.CLIENT_ID;
let authority = env.IDENTITY_AUTHORITY;
let FRONTEND_URL = env.FRONTEND_URL;

const config = {
  authority: authority,
  client_id: client_id,
  redirect_uri: `${FRONTEND_URL}/signin-oidc`,
  response_type: 'code',
  scope: 'openid profile apiApp',
  post_logout_redirect_uri: `${FRONTEND_URL}/user/dashboard`,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  loadUserInfo: true,
  // Enable PKCE
  usePkce: true,
  extraQueryParams: { response_mode: 'query' },
};

export const userManager = new UserManager(config);
