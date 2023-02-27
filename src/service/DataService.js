import {createFilename, getFilePath} from "../common/utils.js";
import AWSService from "../serivice/aws.service.js";
import DataRepository from "../repository/DataRepository.js";

export default class DataService {
    dataRepository = new DataRepository();
    awsService = new AWSService();

    async createDataSet({images, ...data}) {
        const sequenceId = await this.dataRepository.createSequence(data);
        const basePath = `${data.farmId}/${data.houseId}/${data.sequenceDate}/${data.sequence}`;

        const reformed = images.map(image => ({
            ...image,
            etag: null,
            filename: createFilename(image),
            path: basePath,
        }));
        const imagesWithRowId = await this.dataRepository.createCaptureImages(sequenceId, reformed);
        /**
         * 비동기적으로 S3에 저장
         */
        this.saveImagesToS3(imagesWithRowId);
        return reformed;
    }

    async uploadImage(image) {
        const buffer = await this.awsService.transferUrlToBinary(image.image);
        const etagObj = await this.saveBinaryImageToS3(buffer, getFilePath(image));
        const etag = etagObj.ETag;
        await this.dataRepository.updateEtag(image.rowId, etag);
    }

    async saveImagesToS3(images = []) {
        const apiList = images.map(image => this.uploadImage(image));
        await Promise.all(apiList);
    }

    async saveBinaryImageToS3(binary, path) {
        return await this.awsService.upload(binary, path);
    }
}