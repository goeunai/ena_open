import knex from "knex"
import {RawImageSchema, RawSequenceSchema} from "../schema/index.js";
import AWSService from "../serivice/aws.service.js";
import {trimmed} from "../common/utils.js";

const RAW_SEQUENCE = "raw_sequence";
const RAW_IMAGE = 'raw_image';

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
            await this.client.raw("SELECT * FROM raw_sequence LIMIT 1;");
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

    async createRawData({images, ...data}) {
        const rawSequenceId = await this.createRawSequence(data);
        const basePath = `${data.farmId}/${data.houseId}/${data.sequenceDate}/${data.sequence}`;

        const results = await this.saveToS3(basePath, images);
        const reformed = results.map(result => ({
            ...result,
            image: result.etag ? null : result.image
        }))

        await this.createRawImages(rawSequenceId, reformed);
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

    async createRawSequence(data) {
        try {
            const results = await this.client(RAW_SEQUENCE).insert(RawSequenceSchema(data));
            return results[0];
        } catch (e) {
            throw Error(`시퀀스 저장 실패: ${e.message}`)
        }
    }

    async createRawImage(rawSequenceId, image) {
        try {
            await this.client(RAW_IMAGE).insert(RawImageSchema(rawSequenceId, image));
        } catch (e) {
            throw Error(`이미지 저장 실패: ${e.message}`)
        }
    }

    async createRawImages(rawSequenceId, images = []) {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            await this.createRawImage(rawSequenceId, image);
        }
    }

}