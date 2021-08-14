import express, { Request, Response } from "express";
import path from "path";
import suburRouter from "./routers/suburb.router";

const createApp = () => {
    const app = express();

    // Use routers
    app.use("/api/suburb", suburRouter);

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
