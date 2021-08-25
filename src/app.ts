import express, { ErrorRequestHandler, Request, Response } from "express";
import path from "path";
import suburRouter from "./routers/suburb.router";
import schoolRouter from "./routers/school.router";

const createApp = () => {
    const app = express();

    // Request parser
    app.use(express.json());

    // Use routers
    app.use("/api/suburb", suburRouter);
    app.use("/api/school", schoolRouter);

    // Error handler to handle malformed JSON data
    // app.use((err: Error, req: Request, res: Response) => {
    //     res.status(400).json({
    //         message: "Unknown request error",
    //     })
    // });

    try {
        // Index page
        app.all("/", (req: Request, res: Response) => {
            const indexFile = path.join(__dirname, "..", "static", "index.html");
            res.sendFile(indexFile);
        });

        // 404
        app.use((req: Request, res: Response) => {
            res.status(404).send("Page not found");
        });
    } catch (e) {
        console.error(e);
    }
    finally {

        return app;
    }
}

/**
 * Create express app.
 */
export default createApp();
