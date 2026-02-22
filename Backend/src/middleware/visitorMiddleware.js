import crypto from 'node:crypto';

export const visitorMiddleware = (req, res, next) => {
    // Check SIGNED cookie first (tamper-proof) along with tampered/edited
    let signedVisitorId = req.signedCookies['__visitor_id'], visitorId = req.cookies['__visitor_id'];

    const cookieConfig = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
        signed: true,
        path: '/'
    };

    const newUUID = crypto.randomUUID();

    if (!signedVisitorId && visitorId) {
        res.cookie('__visitor_id', newUUID, cookieConfig);
    }

    if (!signedVisitorId && !visitorId) {
        res.cookie('__visitor_id', newUUID, cookieConfig);
    }

    req.session = { visitorId: signedVisitorId || newUUID , ...req.session };
    next();
};
