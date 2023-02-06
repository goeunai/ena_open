export const isNumber = (something) => {
    return !isNaN(Number(something));
}

/**
 * "abcedgf...alsdkf"
 */
export const trimmed = (etag = "") => {
    return etag.replaceAll('\"', "");
}