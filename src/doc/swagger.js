const { exit } = require("process");
const swaggerAutogen = require("swagger-autogen");
require("dotenv").config();

// Paths are relative to root dir
const outputFile = "src/doc/swagger_output.json";
const endpointFile = ["src/app.ts"];

// Check prerequisites
if (!process.env.A_FULL_HOST) {
    console.error("Missing env variables : 'A_FULL_HOST'");
    exit();
}

// Swagger document options
const doc = {
    info: {
        version: "1.0.0",
        title: "Simple School API",
        description: "This is a simple demoAPI site to Create-Retrieve-Update-Delete (CRUD) schools and related suburbs.",
    },
    host: `${process.env.A_FULL_HOST}`,
    schemes: ['https'],
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
