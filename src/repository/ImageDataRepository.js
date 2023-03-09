import {CaptureImageSchema, FindSequenceSchema, SequenceSchema} from "../schema/index.js";
import {connectDB, destroyDB} from "../common/knexUtils.js";

const SEQUENCE = "sequence";
const CAPTURE_IMAGE = 'capture_image';

export default class ImageDataRepository {
    /** @type {knex} */ client;

    async getConnect() {
        return this.client ? this.client : this.client = await connectDB(this.client);
    }

    destroy() {
        return destroyDB(this.client);
    }

    async updateEtag(rowId, etag) {
        const client = await this.getConnect();
        try {
            const update = await client(CAPTURE_IMAGE).update({etag}).where('id', rowId);
        } catch (e) {
            throw Error(`Etag 저장 실패: ${e.message}`)
        }
    }

    async createSequence(data) {
        const client = await this.getConnect();
        try {
            const results = await client(SEQUENCE).insert(SequenceSchema(data));
            return results[0];
        } catch (e) {
            const message = e?.message || "";
            if (message.includes("Duplicate entry") && message.includes("sequence.mixed_id")) {
                throw Error("동일한 데이터를 중복으로 생성할 수 없습니다.");
            }
            throw Error(`시퀀스 저장 실패: ${e.message}`);
        }
    }

    async createCaptureImage(sequenceId, image) {
        const client = await this.getConnect();
        try {
            const res = await client(CAPTURE_IMAGE).insert(CaptureImageSchema(sequenceId, image));
            return res[0];
        } catch (e) {
            throw Error(`이미지 저장 실패: ${e.message}`)
        }
    }

    async createCaptureImages(sequenceId, images = []) {
        const apiList = images.map(async image => {
            const rowId = await this.createCaptureImage(sequenceId, image);
            return {...image, rowId};
        });
        return await Promise.all(apiList);
    }

    async findSequence(data) {
        const client = await this.getConnect();
        try {
            return await client(SEQUENCE).select("*").where(FindSequenceSchema(data));
        } catch (e) {
            console.log(e);
            throw Error(`Sequence조회 실패: ${e.message}`)
        }
    }

    async sequenceAnalyzed(id) {
        const client = await this.getConnect();
        try {
            await client(SEQUENCE).where({id}).update({analyzed: true});
        } catch (e) {
            console.log(e);
            throw Error(`Sequence업데이트 실패(analyzed): ${e.message}`)
        }
    }

}