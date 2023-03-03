import {ALLOWED_IP} from "../common/constants.js";

const whiteIp = (req, res, next) => {
    const ip = req.ip;
    console.log('IP : ', ip);
    if (process.env.NODE_ENV) {
        const results = ALLOWED_IP.map(aip => ip.includes(aip));
        if (results.includes(true)) {
            return next();
        } else {
            return res.status(403).json({ error: "허용되지 않은 IP입니다." });
        }
    }
    next();
}

export default whiteIp;