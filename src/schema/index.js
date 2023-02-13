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
    }
}

export const CaptureImageSchema = (sequenceId, image) => {
    return {
        sequence_id: sequenceId,
        round_number: Number(image.round),
        category: image.category,
        binary_data: image.image,
        filename: image.filename,
        path: image.path,
        etag: image.etag
    }
}
