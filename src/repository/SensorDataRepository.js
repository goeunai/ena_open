import {SensorDataSchema} from "../schema/index.js";
import {connectDB, destroyDB} from "../common/knexUtils.js";

const SENSOR = "sensor_data";

export default class SensorDataRepository {
    /** @type {knex} */ client;

    async getConnect() {
        return this.client ? this.client : this.client = await connectDB(this.client);
    }

    destroy() {
        return destroyDB(this.client);
    }

    async createSensorData(data) {
        const client = await this.getConnect();
        try {
            const results = await client(SENSOR).insert(SensorDataSchema(data));
            return results[0];
        } catch (e) {
            throw Error(`센서 데이터 저장 실패: ${e.message}`);
        }
    }

}