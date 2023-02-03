import {body} from 'express-validator';

export const imageBodyValidator = [
    body("farmId").notEmpty().trim().withMessage("farmId는 필수값입니다."),
    body("houseId").notEmpty().trim().withMessage("houseId는 필수값입니다."),
    body("sequence").isInt().withMessage("sequence는 숫자만 입력 가능합니다."),
    body("sequenceDate").notEmpty().trim().withMessage("sequenceDate는 필수값입니다."),
    body("totalRounds").isInt().withMessage("totalRounds는 숫자만 입력 가능합니다."),
    body("images").isArray().withMessage("images는 배열만 입력 가능합니다.")
]