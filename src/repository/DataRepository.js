import knex from "knex"
import {RawImageSchema, RawSequenceSchema} from "../schema/index.js";

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
        })
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

    async createRawData({images, ...data}) {
        const rawSequenceId = await this.createRawSequence(data);
        await this.createRawImage(rawSequenceId, images);
    }

    async createRawSequence(data) {
        try {
            const results = await this.client(RAW_SEQUENCE).insert(RawSequenceSchema(data));
            return results[0];
        } catch (e) {
            throw Error(`시퀀스 저장 실패: ${e.message}`)
        }
    }

    async createRawImage(rawSequenceId, images) {
        try {
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                await this.client(RAW_IMAGE).insert(RawImageSchema(rawSequenceId, image));
            }
        } catch (e) {
            throw Error(`이미지 저장 실패: ${e.message}`)
        }
    }

}