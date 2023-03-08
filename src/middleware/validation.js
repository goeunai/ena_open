import {body} from 'express-validator';

const requiredFarm = "farmId는 필수값입니다.";
const requiredHouse = "houseId는 필수값입니다.";
const sequenceMsg = "sequence는 숫자만 입력 가능합니다.";
const requiredSequenceDate = "sequenceDate는 필수값입니다.";
const totalRoundsMsg = "totalRounds는 숫자만 입력 가능합니다.";
const imagesMsg = "images는 배열만 입력 가능합니다.";

export const imageBodyValidator = [
    body("farmId").notEmpty().trim().withMessage(requiredFarm),
    body("houseId").notEmpty().trim().withMessage(requiredHouse),
    body("sequence").isInt().withMessage(sequenceMsg),
    body("sequenceDate").notEmpty().trim().withMessage(requiredSequenceDate),
    body("totalRounds").isInt().withMessage(totalRoundsMsg),
    body("images").isArray().withMessage(imagesMsg)
]

export const sequenceAnalyzedBodyValidator = [
    body("farmId").notEmpty().trim().withMessage(requiredFarm),
    body("houseId").notEmpty().trim().withMessage(requiredHouse),
    body("sequence").isInt().withMessage(sequenceMsg),
]