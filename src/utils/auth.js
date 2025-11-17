const TOKEN_KEY = 'saas_token';
const USER_KEY = 'saas_user';

export function saveToken(token) { localStorage.setItem(TOKEN_KEY, token); }
export function getToken() { return localStorage.getItem(TOKEN_KEY); }
export function logout() { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); }
export function saveUser(u) { localStorage.setItem(USER_KEY, JSON.stringify(u)); }
export function getUser() { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); }
export function getUsername() { const u=getUser(); return u ? u.fullName || u.username : null; }
