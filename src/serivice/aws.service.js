import AWS from "aws-sdk"
import LogService from "./log.service.js";

export default class AWSService {
    s3

    constructor() {
        AWS.config.update({
            region: "ap-northeast-2",
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
        })

        this.s3 = new AWS.S3()
    }

    upload(binary, filePath) {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: filePath,
                Body: binary,
                ContentType: `image/png`,
            };

            this.s3
                .putObject(params)
                .promise()
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    new LogService().logError(error);
                    resolve({ETag: null})
                })
        })
    }
}
