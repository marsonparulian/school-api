import db from "./services/db/db";
import app from "./app";

// This file is the entry point to start application and DB

// Port
const port: number = process.env.A_PORT ? parseInt(process.env.A_PORT) : 8080;

// Dtart DB
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


