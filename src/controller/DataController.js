import DataRepository from "../repository/DataRepository.js";
import LogService from "../serivice/log.service.js";

export const handleImage = async (req, res) => {
    try {
        const repository = await new DataRepository().createConnection();
        const results = await repository.createRawData(req.body);
        repository.destroyConnection();

        const total = results.length;
        const success = results.filter(v => v.etag).length;

        res.status(200).json({total, success, fail: total - success});
    } catch (e) {
        LogService.logError(e);
        return res.status(500).json({error: e?.message || "서버 에러"});
    }
    
}