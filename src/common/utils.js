export const isNumber = (something) => {
    return !isNaN(Number(something));
}

/**
 * "abcedgf...alsdkf"
 */
export const trimmed = (etag = "") => {
    return etag.replaceAll('\"', "");
}

export const getFilePath = (image) => {
    return `${image.path}/${image.filename}`;
}

export const createFilename = (image) => {
    const now = new Date().valueOf();
    return `${now}_${image.round}_${image.category || 'N'}.png`
}

export const sequenceMixedId = ({farmId, houseId, sequenceDate, sequence}) => {
    return `${farmId}:${houseId}:${sequenceDate}:${sequence}`;
}

export const dbOption = (host, user, password, database) => {
    return {
        client: "mysql2",
        connection: {
            port: 3306,
            host,
            user,
            password,
            database,
        },
    };
}