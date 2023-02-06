import DataRepository from "../repository/DataRepository.js";
import LogService from "../serivice/log.service.js";

export const handleImage = async (req, res) => {
    const repository = new DataRepository();

    try {
        await repository.createConnection();
        const results = await repository.createRawData(req.body);
        repository.destroyConnection();

        const total = results.length;
        const success = results.filter(v => v.etag).length;

        /**
         #swagger.responses[200] = {
            schema: {total: 10, success: 9, fail: 1}
         }
         */
        res.status(200).json({total, success, fail: total - success});
    } catch (e) {
        new LogService().logError(e);
        console.error(e);
        /**
         #swagger.responses[500] = {
            schema: { error: "메세지 || 서버 에러" }
         }
         */
        return res.status(500).json({error: e?.message || "서버 에러"});
    }
    
}