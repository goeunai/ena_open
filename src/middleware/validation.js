import {body} from 'express-validator';

const requiredFarm = "farmId는 필수값입니다.";
const requiredHouse = "houseId는 필수값입니다.";
const sequenceMsg = "sequence는 숫자만 입력 가능합니다.";
const requiredSequenceDate = "sequenceDate는 필수값입니다.";
const totalRoundsMsg = "totalRounds는 숫자만 입력 가능합니다.";
const imagesMsg = "images는 배열만 입력 가능합니다.";
const requiredDevice = "deviceId는 필수값입니다.";
const requiredMeasuredDate = "measuredDate는 필수값입니다.";

export const imageBodyValidator = [
    body("farmId").notEmpty().trim().withMessage(requiredFarm),
    body("houseId").notEmpty().trim().withMessage(requiredHouse),
    body("sequence").isInt().withMessage(sequenceMsg),
    body("sequenceDate").notEmpty().trim().withMessage(requiredSequenceDate),
    body("totalRounds").isInt().withMessage(totalRoundsMsg),
    body("images").isArray().withMessage(imagesMsg)
];

export const sequenceAnalyzedBodyValidator = [
    body("farmId").notEmpty().trim().withMessage(requiredFarm),
    body("houseId").notEmpty().trim().withMessage(requiredHouse),
    body("sequence").isInt().withMessage(sequenceMsg),
    body("sequenceDate").notEmpty().trim().withMessage(requiredSequenceDate),
];

export const sensorBodyValidator = [
    body("deviceId").notEmpty().trim().withMessage(requiredDevice),
    body("measuredDate").isISO8601().notEmpty().withMessage(requiredMeasuredDate),
    body("light").optional().isFloat(),
    body("co2").optional().isFloat(),
    body("temp").optional().isFloat(),
    body("humidity").optional().isFloat(),
    body("underEc").optional().isFloat(),
    body("underPh").optional().isFloat(),
    body("underTemp").optional().isFloat(),
    body("underHumidity").optional().isFloat(),
    body("fieldWind").optional().isFloat(),
    body("fieldLight").optional().isFloat(),
    body("fieldTemp").optional().isFloat(),
    body("fieldHumidity").optional().isFloat(),
    body("fieldRain").optional().isFloat(),
    body("inPh").optional().isFloat(),
    body("inEc").optional().isFloat(),
    body("inTemp").optional().isFloat(),
    body("outPh").optional().isFloat(),
    body("outEc").optional().isFloat(),
    body("outTemp").optional().isFloat(),
];