import {createFilename, getFilePath} from "../common/utils.js";
import AWSService from "./aws.service.js";
import ImageDataRepository from "../repository/ImageDataRepository.js";

export default class ImageDataService {
    awsService = new AWSService();

    async createDataSet({images, ...data}) {
        const imageDataRepository = new ImageDataRepository();
        const sequenceId = await imageDataRepository.createSequence(data);
        const basePath = `${data.farmId}/${data.houseId}/${data.sequenceDate}/${data.sequence}`;

        const reformed = images.map(image => ({
            ...image,
            etag: null,
            filename: createFilename(image),
            path: basePath,
        }));
        const imagesWithRowId = await imageDataRepository.createCaptureImages(sequenceId, reformed);
        await imageDataRepository.destroy();
        /**
         * 비동기적으로 S3에 저장
         */
        this.saveImagesToS3(imagesWithRowId);
        return reformed;
    }

    async uploadImage(image, repository) {
        const buffer = await this.awsService.transferUrlToBinary(image.image);
        const etagObj = await this.saveBinaryImageToS3(buffer, getFilePath(image));
        const etag = etagObj.ETag;
        await repository.updateEtag(image.rowId, etag);
    }

    async saveImagesToS3(images = []) {
        const imageDataRepository = new ImageDataRepository();
        const apiList = images.map(image => this.uploadImage(image, imageDataRepository));
        await Promise.all(apiList);
        await imageDataRepository.destroy();
        // for (const image of images) {
        //     await this.uploadImage(image);
        // }
    }

    async saveBinaryImageToS3(binary, path) {
        return await this.awsService.upload(binary, path);
    }
    
    async completeAnalyze(data) {
        // 데이터 찾기
        const imageDataRepository = new ImageDataRepository();
        const foundList = await imageDataRepository.findSequence(data);
        if (foundList.length === 0) return null;
        
        // 데이터 업데이트
        const found = foundList[0];
        await imageDataRepository.sequenceAnalyzed(found.id);
        await imageDataRepository.destroy();
        return true;
    }
}