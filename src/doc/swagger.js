const swaggerAutogen = require("swagger-autogen");

// Paths are relative to root dir
const outputFile = "src/doc/swagger_output.json";
const endpointFile = ["src/app.ts"];

swaggerAutogen()(outputFile, endpointFile);
