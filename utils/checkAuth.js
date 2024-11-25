import JWT from "jsonwebtoken"

// middleware function for auth check

export const checkAuth = (req, res, next) => {

    if (!req.headers.authtoken) {
        return res.status(403).json({ success: false, message: "Auth token required" });
    }
    const { authtoken } = req.headers;
    // verify auth token 
    JWT.verify(authtoken, process.env.JWTSECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({ success: false, message: "invalid token" });
        }
        req.user = user;
    })
    next();
}

