import knex from "knex"
import {CaptureImageSchema, SequenceSchema} from "../schema/index.js";
import AWSService from "../serivice/aws.service.js";
import {trimmed} from "../common/utils.js";

const SEQUENCE = "sequence";
const CAPTURE_IMAGE = 'capture_image';

export default class DataRepository {
    /** @type client {knex} */ client

    constructor() {
        this.client = knex({
            client: "mysql2",
            connection: {
                port: 3306,
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PW,
                database: process.env.DB_NAME,
            },
        });
    }

    async createConnection() {
        try {
            await this.client.raw("SELECT * FROM sequence LIMIT 1;");
        } catch (error) {
            throw Error(`DB 연결 실패: ${error.message}`)
        }
    }

    destroyConnection() {
        this.client.destroy();
    }

    getFilePath(image) {
        return `${image.path}/${image.filename}`;
    }

    getFilename(image) {
        const now = new Date().valueOf();
        return `${now}_${image.round}_${image.category || 'N'}.png`
    }

    async createDataSet({images, ...data}) {
        const sequenceId = await this.createSequence(data);
        const basePath = `${data.farmId}/${data.houseId}/${data.sequenceDate}/${data.sequence}`;

        const results = await this.saveToS3(basePath, images);
        const reformed = results.map(result => ({
            ...result,
            image: result.etag ? null : result.image
        }))

        await this.createCaptureImages(sequenceId, reformed);
        return results;
    }

    async saveToS3(basePath, images) {
        const awsService = new AWSService();
        const results = images.map(image => ({
            ...image,
            etag: null,
            filename: this.getFilename(image),
            path: basePath,
        }));
        const apiList = results.map(result => awsService.upload(result.image, this.getFilePath(result)));
        const etagList = await Promise.all(apiList);

        return results.map((result, idx) => {
            const etag = etagList[idx]['ETag'] ? trimmed(etagList[idx]['ETag']) : null;
            return {...result, etag};
        });
    }

    async createSequence(data) {
        try {
            const results = await this.client(SEQUENCE).insert(SequenceSchema(data));
            return results[0];
        } catch (e) {
            throw Error(`시퀀스 저장 실패: ${e.message}`)
        }
    }

    async createCaptureImage(sequenceId, image) {
        try {
            await this.client(CAPTURE_IMAGE).insert(CaptureImageSchema(sequenceId, image));
        } catch (e) {
            throw Error(`이미지 저장 실패: ${e.message}`)
        }
    }

    async createCaptureImages(sequenceId, images = []) {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            await this.createCaptureImage(sequenceId, image);
        }
    }

}