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