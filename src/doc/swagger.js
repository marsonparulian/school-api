const { exit } = require("process");
const swaggerAutogen = require("swagger-autogen");
require("dotenv").config();

// Paths are relative to root dir
const outputFile = "src/doc/swagger_output.json";
const endpointFile = ["src/app.ts"];

// Check prerequisites
if (!process.env.A_HOST) {
    console.error("Missing env variables : 'A_HOST'");
    exit();
}
if (!process.env.A_PORT) {
    console.error("Missing env variable : A_PORT");
    exit();
}

// Swagger document options
const doc = {
    info: {
        version: "1.0.0",
        title: "Simple School API",
        description: "This is a simple demoAPI site to Create-Retrieve-Update-Delete (CRUD) schools and related suburbs.",
    },
    // host:"localhost:8080",
    host: `${process.env.A_HOST}:${process.env.A_PORT}`,
    consumes: ["application/json"],
    tags: [
        { name: "Suburb", description: "Suburb CRUD" },
        { name: "School", description: "School CRUD" },
    ],
    definitions: {
        SaveSuburb: {
            name: "Sydney",
            postCode: "2000",
        },
        SaveSchool: {
            name: "General Public School",
            suburb: "123456789012345678901234",
        },
    },
};

// Generate swagger json
swaggerAutogen()(outputFile, endpointFile, doc);
