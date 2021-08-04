import express, { Request, Response } from "express";
import path from "path";

const createApp = () => {
    const app = express();

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
