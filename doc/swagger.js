const swaggerAutogen = require("swagger-autogen");

// Paths are realtive to root dir
const outputFile = "doc/swagger_output.json";
const endpointFile = ["src/app.ts"];

swaggerAutogen()(outputFile, endpointFile);
