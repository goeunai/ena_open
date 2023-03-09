import SensorDataRepository from "../repository/SensorDataRepository.js";

export default class SensorDataService {

    async createSensorData(data) {
        const sensorDataRepository = new SensorDataRepository();
        const result = await sensorDataRepository.createSensorData(data);
        await sensorDataRepository.destroy();
        return result;
    }

}