import { doubleCsrf } from 'csrf-csrf';

export const { 
  generateCsrfToken, // to generate CSRF token
  doubleCsrfProtection // It's middleware that validate and stop attacker if no/invalid CSRF token
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  getSessionIdentifier: (req) => req.session?.visitorId || 'anon',
  
  cookieName: process.env.NODE_ENV === 'production' ? "__Host-x-csrf-token" : "x-csrf-token",
  cookieOptions: {
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax", 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
  },
  size: 32,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  getCsrfTokenFromRequest: (req) => req.headers["x-csrf-token"],
});