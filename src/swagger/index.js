import dotenv from 'dotenv';
dotenv.config();

import SwaggerAutogen from 'swagger-autogen';

console.log("=== Swagger Autogen ===")

const doc = {
    info: {
        version: '1.0.0',
        title: 'Ena open API',
        description: '외부 데이터를 수신하는 API들입니다.',
    },
    host: process.env.HOST,
    basePath: '/',
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: '', // Tag name
            description: '', // Tag description
        },
    ],
    securityDefinitions: {}, // by default: empty object
    definitions: {}, // by default: empty object (Swagger 2.0)
    components: {} // by default: empty object (OpenAPI 3.x)
};

const outputFile = './output/swagger.json';
const endpointsFiles = ["../index.js"];

SwaggerAutogen(outputFile, endpointsFiles, doc);