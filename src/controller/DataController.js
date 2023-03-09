import LogService from "../service/log.service.js";
import ImageDataService from "../service/ImageDataService.js";
import SensorDataService from "../service/SensorDataService.js";

export const handleImage = async (req, res) => {
    try {
        const results = await new ImageDataService().createDataSet(req.body);
        const total = results.length;
        const success = results.filter(v => v.image).length;

        res.status(200).json({total, success, fail: total - success});
    } catch (e) {
        LogService.logError(e);
        return res.status(500).json({error: e?.message || "서버 에러"});
    }
    
}

export const handleAnalyzeData = async (req, res) => {
    try {
        const result = await new ImageDataService().completeAnalyze(req.body);
        if (result === null) return res.status(404).json({error: "데이터를 찾을 수 없습니다."});
        res.status(200).json("ok");
    } catch (e) {
        LogService.logError(e);
        return res.status(500).json({error: e?.message || "서버 에러"});
    }
}

export const handleSensorData = async (req, res) => {
    try {
        const result = await new SensorDataService().createSensorData(req.body);
        console.log(result);
        res.status(200).json(result);
    } catch (e) {
        LogService.logError(e);
        return res.status(500).json({error: e?.message || "서버 에러"});
    }
}