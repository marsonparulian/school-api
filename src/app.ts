import express, { Request, Response } from "express";

const createApp = () => {
    const app = express();

    // Index page
    app.all("/", (req: Request, res: Response) => {
        res.status(200).send("Index page");
    })
    // 404
    app.use((req: Request, res: Response) => {
        res.status(404).send("Page not found");
    });

    return app;
}

/**
 * Create express app.
 */
export default createApp();
