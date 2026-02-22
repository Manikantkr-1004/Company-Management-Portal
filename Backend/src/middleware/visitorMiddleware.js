import crypto from 'node:crypto';

export const visitorMiddleware = (req, res, next) => {
    // Check SIGNED cookie first (tamper-proof)
    let visitorId = req.signedCookies['__visitor_id'];

    if (!visitorId && req.cookies['__visitor_id']) {
        visitorId = crypto.randomUUID();
        res.cookie('__visitor_id', visitorId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
            signed: true,
            path: '/'
        });
    }

    if (!visitorId && !req.cookies['__visitor_id']) {
        visitorId = crypto.randomUUID(); // Regenerate fresh
        res.cookie('__visitor_id', visitorId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
            signed: true,
            path: '/'
        });
    }

    req.session = { visitorId, ...req.session };
    next();
};
