import AWS from "aws-sdk"

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

    async upload(binary, file = "") {
        try {
            return await this.uploadAction(binary, file)
        } catch (error) {
            throw error
        }
    }

    uploadAction(binary, file) {
        return new Promise((resolve, reject) => {
            let reformed = file[0] === "/" ? file.substring(1, file.length) : file

            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: reformed,
                Body: binary,
                ContentType: "image/jpeg",
            }

            this.s3
                .putObject(params)
                .promise()
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}
