import {Router} from 'express';
import {handleAnalyzeData, handleImage, handleSensorData} from "../controller/DataController.js";
import {imageBodyValidator, sensorBodyValidator, sequenceAnalyzedBodyValidator} from "../middleware/validation.js";
import {validationResult} from 'express-validator';
import morgan from 'morgan';


const router = Router();
router.use(morgan('combined'));

router.post("/image", imageBodyValidator, (req, res, next) => {
    /**
     #swagger.tags = ['Data']
     #swagger.parameters['data'] = {
        in: 'body',
        description: '라온 서버에서 전송할 데이터 양식입니다.',
        schema: {
            $farmId: "goeun_farm",
            $houseId: "goeun_1",
            $sequence: 1,
            $sequenceDate: "20230101",
            $totalRounds: 3,
            $images : [
                {"round": 1, "category": "top", "image": "https://ena-image-dev.s3.ap-northeast-2.amazonaws.com/1/1/20230101/1/image+(115).jpg"},
                {"round": 1, "category": "sideCrown", "image": "https://ena-image-dev.s3.ap-northeast-2.amazonaws.com/1/1/20230101/1/image+(115).jpg"},
                {"round": 1, "category": "sideFruit", "image": "https://ena-image-dev.s3.ap-northeast-2.amazonaws.com/1/1/20230101/1/image+(115).jpg"},
                {"round": 2, "category": "top", "image": "https://ena-image-dev.s3.ap-northeast-2.amazonaws.com/1/1/20230101/1/image+(115).jpg"},
                {"round": 2, "category": "sideCrown", "image": "https://ena-image-dev.s3.ap-northeast-2.amazonaws.com/1/1/20230101/1/image+(115).jpg"},
                {"round": 2, "category": "sideFruit", "image": "https://ena-image-dev.s3.ap-northeast-2.amazonaws.com/1/1/20230101/1/image+(115).jpg"},
                {"round": 3, "category": "top", "image": "https://ena-image-dev.s3.ap-northeast-2.amazonaws.com/1/1/20230101/1/image+(115).jpg"},
                {"round": 3, "category": "sideCrown", "image": "https://ena-image-dev.s3.ap-northeast-2.amazonaws.com/1/1/20230101/1/image+(115).jpg"},
                {"round": 3, "category": "sideFruit", "image": "https://ena-image-dev.s3.ap-northeast-2.amazonaws.com/1/1/20230101/1/image+(115).jpg"},
            ]
        }
     }
     #swagger.responses[200] = {
        schema: {total: 10, success: 9, fail: 1}
     }
     #swagger.responses[400] = {
        schema: {
            errors: [
                { msg: "farmId는 필수값입니다.", param: "farmId", location: "body" }
            ]
        }
     }
     #swagger.responses[403] = {
        schema: { error: '허용되지 않은 IP입니다.' }
     }
     #swagger.responses[500] = {
        schema: { error: "메세지 || 서버 에러" }
     }
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    return handleImage(req, res, next);
});

router.post("/sequence/analyzed", sequenceAnalyzedBodyValidator, (req, res, next) => {
    /**
     #swagger.tags = ['Data']
     #swagger.parameters['data'] = {
        in: 'body',
        description: '알고리즘 분석이 완료된 Sequence 정보를 전송합니다.',
        schema: {
            $farmId: "goeun_farm",
            $houseId: "goeun_1",
            $sequenceDate: "20230101",
            $sequence: 1
        }
     }
     #swagger.responses[200] = {
        schema: {total: 1, success: 1, fail: 0}
     }
     #swagger.responses[400] = {
        schema: {
            errors: [
                { msg: "farmId는 필수값입니다.", param: "farmId", location: "body" }
            ]
        }
     }
     #swagger.responses[403] = {
        schema: { error: '허용되지 않은 IP입니다.' }
     }
     #swagger.responses[404] = {
        schema: { error: '데이터를 찾을 수 없습니다.' }
     }
     #swagger.responses[500] = {
        schema: { error: "메세지 || 서버 에러" }
     }
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    return handleAnalyzeData(req, res, next);
});


router.post("/sensor", sensorBodyValidator, (req, res, next) => {
    /**
     #swagger.tags = ['Sensor']
     #swagger.parameters['data'] = {
        in: 'body',
        description: '측정된 센서 값입니다.',
        schema: {
            $deviceId: 1,
            $measuredDate: "2023-01-01T00:00:00",
            $light: 1,
            $co2: 2,
            $light: 1.1,
            $co2: 1.2,
            $temp: 1.3,
            $humidity: 1.4,
            $underEc: 1.5,
            $underPh: 1.6,
            $underTemp: 1.7,
            $underHumidity: 1.8,
            $fieldWind: 1.9,
            $fieldLight: 2.0,
            $fieldTemp: 2.1,
            $fieldHumidity: 2.2,
            $fieldRain: 2.3,
            $inPh: 2.4,
            $inEc: 2.5,
            $inTemp: 2.6,
            $outPh: 2.7,
            $outEc: 2.8,
            $outTemp: 2.9
        }
     }
     #swagger.responses[400] = {
        schema: {
            errors: [
                { msg: "deviceId는 필수값입니다.", param: "deviceId", location: "body" }
            ]
        }
     }
     #swagger.responses[403] = {
        schema: { error: '허용되지 않은 IP입니다.' }
     }
     #swagger.responses[500] = {
        schema: { error: "메세지 || 서버 에러" }
     }
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    return handleSensorData(req, res, next);
});

export default router;