import {createFilename, getFilePath} from "../common/utils.js";
import AWSService from "./aws.service.js";
import DataRepository from "../repository/DataRepository.js";

export default class DataService {
    awsService = new AWSService();

    async createDataSet({images, ...data}) {
        const dataRepository = new DataRepository();
        const sequenceId = await dataRepository.createSequence(data);
        const basePath = `${data.farmId}/${data.houseId}/${data.sequenceDate}/${data.sequence}`;

        const reformed = images.map(image => ({
            ...image,
            etag: null,
            filename: createFilename(image),
            path: basePath,
        }));
        const imagesWithRowId = await dataRepository.createCaptureImages(sequenceId, reformed);
        await dataRepository.destroy();
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
        const dataRepository = new DataRepository();
        const apiList = images.map(image => this.uploadImage(image, dataRepository));
        await Promise.all(apiList);
        await dataRepository.destroy();
        // for (const image of images) {
        //     await this.uploadImage(image);
        // }
    }

    async saveBinaryImageToS3(binary, path) {
        return await this.awsService.upload(binary, path);
    }
    
    async completeAnalyze({farmId, houseId, sequence}) {
        // 데이터 찾기
        const dataRepository = new DataRepository();
        const foundList = await dataRepository.findSequence({farmId, houseId, sequence});
        if (foundList.length === 0) return null;
        
        // 데이터 업데이트
        const found = foundList[0];
        await dataRepository.sequenceAnalyzed(found.id);
        await dataRepository.destroy();
        return true;
    }
}