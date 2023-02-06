import {Router} from 'express';
import {handleImage} from "../controller/DataController.js";
import {imageBodyValidator} from "../middleware/validation.js";
import {validationResult} from 'express-validator';

const router = Router();

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
                        {"round": 1, "category": "top", "image": "...byte stream... 1"},
                        {"round": 1, "category": "sideCrown", "image": "...byte stream... 2"},
                        {"round": 1, "category": "sideFruit", "image": "...byte stream... 3"},
                        {"round": 2, "category": "top", "image": "...byte stream... 4"},
                        {"round": 2, "category": "sideCrown", "image": "...byte stream... 5"},
                        {"round": 2, "category": "sideFruit", "image": "...byte stream... 6"},
                        {"round": 3, "category": "top", "image": "...byte stream... 7"},
                        {"round": 3, "category": "sideCrown", "image": "...byte stream... 8"},
                        {"round": 3, "category": "sideFruit", "image": "...byte stream... 9"},
                    ]
                }
     }
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        /**
         #swagger.responses[400] = {
            schema: {
                errors: [
                    {
                        msg: "farmId는 필수값입니다.",
                        param: "farmId",
                        location: "body"
                    }
                ]
            }
         }
         */
        return res.status(400).json({ errors: errors.array() });
    }
    return handleImage(req, res, next);
});

export default router;