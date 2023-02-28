const whiteIp = (req, res, next) => {
    console.log(req.ip);
    next();
}

export default whiteIp;