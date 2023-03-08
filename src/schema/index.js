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
        mixed_id: sequenceMixedId({farmId, houseId,sequenceDate, sequence})
    }
}

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
}

export const FindSequenceSchema = ({farmId, houseId, sequenceDate, sequence}) => {
    return {
        mixed_id: sequenceMixedId({farmId, houseId,sequenceDate, sequence}),
    }
}