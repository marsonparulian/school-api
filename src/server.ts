import { Request, Response } from "express";
import db from "./services/db/db";
import app from "./app";
import swaggerUiExpress from "swagger-ui-express";
import swaggerFile from "./doc/swagger_output.json";

// This file is the entry point to start application and DB

// Port
const port: number = process.env.A_PORT ? parseInt(process.env.A_PORT) : 8080;

// Doc 
// const swaggerFilePath = "../doc/swagger_output.json";

app.use("/doc", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

// 404
app.use((req: Request, res: Response) => {
    res.status(404).send("Page not found");
});

// start DB
console.log("Connecting to DB");
db.connect()
    .then(() => {
        console.log("Connected to DB. Starting app..");
        app.listen(port, () => {
            console.log(`App started on port ${port}`);
        });
    }).catch((e) => {
        console.error("Failed connection to DB");
        console.error(e.message);
    })


