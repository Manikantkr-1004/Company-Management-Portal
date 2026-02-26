
export const visitorMiddleware = (req, res, next) => {

    const signedVisitorId = req.signedCookies['__visitor_id'];
    let visitorId = signedVisitorId; // Using signed cookie only that is tampered proof

    const cookieConfig = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
        signed: true,
        path: '/'
    };

    if (!visitorId) { // For new user and if exist user tampered cookie
        visitorId = crypto.randomUUID();
        res.cookie('__visitor_id', visitorId, cookieConfig);
    }

    req.session = { ...req.session, visitorId }; // Adding visitorId in req.session for CSRF config
    next();
};