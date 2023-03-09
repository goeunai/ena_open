import {sequenceMixedId} from "../common/utils.js";

export const SequenceSchema = (
    {
        farmId,
        houseId,
        sequenceDate,
        sequence,
        totalRounds
    }
) => {
    return {
        raw_farm_id: farmId,
        raw_house_id: houseId,
        sequence_date: sequenceDate,
        sequence_number: Number(sequence),
        total_rounds: Number(totalRounds),
        mixed_id: sequenceMixedId({farmId, houseId, sequenceDate, sequence})
    }
};

export const CaptureImageSchema = (sequenceId, image) => {
    return {
        sequence_id: sequenceId,
        round_number: Number(image.round),
        category: image.category,
        origin_path: image.image,
        filename: image.filename,
        path: image.path,
        etag: null,
    }
};

export const FindSequenceSchema = ({farmId, houseId, sequenceDate, sequence}) => {
    return {
        mixed_id: sequenceMixedId({farmId, houseId, sequenceDate, sequence}),
    }
};

export const SensorDataSchema = (
    {
        deviceId,
        measuredDate,
        light,
        co2,
        temp,
        humidity,
        underEc,
        underPh,
        underTemp,
        underHumidity,
        fieldWind,
        fieldLight,
        fieldTemp,
        fieldHumidity,
        fieldRain,
        inPh,
        inEc,
        inTemp,
        outPh,
        outEc,
        outTemp
    }
) => {
    return {
        raw_device_id: deviceId,
        measured_date: measuredDate,
        light: light,
        co2: co2,
        temp: temp,
        humidity: humidity,
        under_ec: underEc,
        under_ph: underPh,
        under_temp: underTemp,
        under_humidity: underHumidity,
        field_wind: fieldWind,
        field_light: fieldLight,
        field_temp: fieldTemp,
        field_humidity: fieldHumidity,
        field_rain: fieldRain,
        in_ph: inPh,
        in_ec: inEc,
        in_temp: inTemp,
        out_ph: outPh,
        out_ec: outEc,
        out_temp: outTemp,
    }
};
