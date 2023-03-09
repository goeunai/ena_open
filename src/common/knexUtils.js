import knex from "knex";
import {dbOption} from "./utils.js";

/**
 * @returns Promise{knex}
 */
export const connectDB = (client) => {
    const option = dbOption(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PW, process.env.DB_NAME);
    return knex(option);
}

export const destroyDB = async (client) => {
    try {
        await client.destroy();
    } catch (e) {
        throw Error(`DB 종료 실패: ${e.message}`);
    }
}
