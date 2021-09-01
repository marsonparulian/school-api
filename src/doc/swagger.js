const swaggerAutogen = require("swagger-autogen");

// Paths are relative to root dir
const outputFile = "src/doc/swagger_output.json";
const endpointFile = ["src/app.ts"];

// Swagger document options
const doc = {
    info: {
        version: "1.0.0",
        title: "Simple School API",
        description: "Simple demo API to do CRUd operations to school / suburb.",
    },
    host: "localhost:8080",
    consumes: ["application/json"],
    tags: [
        { name: "School", description: "School CRUD" },
    ],
};

// Generate swagger json
swaggerAutogen()(outputFile, endpointFile, doc);
