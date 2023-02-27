import AWS from "aws-sdk"
import LogService from "./log.service.js";
import axios from "axios";

export default class AWSService {
    s3

    constructor() {
        if (this.s3) return;

        AWS.config.update({
            region: "ap-northeast-2",
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
        });

        this.s3 = new AWS.S3();
    }

    async transferUrlToBinary(url) {
        try {
            const res = await axios({
                method: "get",
                url,
                responseType: 'arraybuffer',
            });
            return Buffer.from(res.data, 'binary');
        } catch (e) {
            console.error(e);
        }

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
                .catch(e => {
                    LogService.logError(e);
                    resolve({ETag: null})
                });
        })
    }
}
