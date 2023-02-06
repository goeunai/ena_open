import {isNumber} from "../common/utils.js";

export const farmSchema = (farmId) => {
    if (isNumber(farmId)) {
        return {
            farm_id: Number(farmId) || null,
            farm_id_alias: null,
        }
    } else {
        return {
            farm_id: null,
            farm_id_alias: farmId,
        }
    }
}

export const houseSchema = (houseId) => {
    if (isNumber(houseId)) {
        return {
            house_id: Number(houseId) || null,
            house_id_alias: null,
        }
    } else {
        return {
            house_id: null,
            house_id_alias: houseId,
        }
    }
}

export const RawSequenceSchema = (
    {
        farmId,
        houseId,
        sequenceDate,
        sequence,
        totalRounds
    }
) => {
    return {
        ...farmSchema(farmId),
        ...houseSchema(houseId),
        sequence_date: sequenceDate,
        sequence: Number(sequence),
        total_rounds: Number(totalRounds),
    }
}

export const RawImageSchema = (rawSequenceId, image) => {
    return {
        raw_sequence_id: rawSequenceId,
        round: Number(image.round),
        category: image.category,
        file_stream: image.image,
        filename: image.filename,
        path: image.path,
        try: 0,
        etag: image.etag
    }
}
