import JWT from "jsonwebtoken"


export const checkAuth = (req, res, next) => {
    // let id = req.params.id;
    if (!req.headers["authToken"]) {
        return res.status(403).json({ success: false, message: "Auth token required" });
    }

    let tokenHeader = req.headers["authToken"];
    let token = tokenHeader && tokenHeader.split(" ")[1];
    // verify auth token 
    JWT.verify(token, process.env.JWTSECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "invalid token" });
        }
        req.user = user;
    })
    next();
}