export const httpsOnly = (req, res, next) => {
    if (process.env.NODE_ENV && !req.secure) {
        return res.status(403).json({error: "Https Only"});
    }
    next();
}