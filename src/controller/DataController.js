import LogService from "../service/log.service.js";
import DataService from "../service/data.service.js";

export const handleImage = async (req, res) => {
    try {
        const results = await new DataService().createDataSet(req.body);
        const total = results.length;
        const success = results.filter(v => v.image).length;

        res.status(200).json({total, success, fail: total - success});
    } catch (e) {
        LogService.logError(e);
        return res.status(500).json({error: e?.message || "서버 에러"});
    }
    
}