import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import cors from "cors";
import { checkPageScore, isValidUrl } from "./utils/pagehealth.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/check", async (req, res) => {
    const { url } = req.body;

    // Validate the URL first
    if (!isValidUrl(url)) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    try {
        // Fetch the HTML from the URL
        const response = await fetch(url, { timeout: 10000 }); // 10s timeout
        if (!response.ok) {
            return res.status(response.status).json({ error: `Failed to fetch page, status ${response.status}` });
        }

        const html = await response.text();

        // Load HTML safely into Cheerio
        let $;
        try {
            $ = cheerio.load(html);
        } catch (err) {
            console.error("Cheerio parsing error:", err);
            return res.status(500).json({ error: "Failed to parse HTML" });
        }

        // Run your page audit
        const result = checkPageScore($);
        return res.json(result);

    } catch (err) {
        console.error("Server fetch error:", err);
        return res.status(500).json({ error: "Failed to fetch or parse the URL" });
    }
});

const startServer = (port = process.env.PORT || 5050, attempts = 0) => {
    const server = app.listen(port, () => console.log(`Server running on port ${port}`));

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE' && attempts < 3) {
            const nextPort = Number(port) + 1;
            console.warn(`Port ${port} is in use. Trying port ${nextPort}...`);
            setTimeout(() => startServer(nextPort, attempts + 1), 500);
        } else {
            console.error('Server failed to start:', err);
            process.exit(1);
        }
    });
};

startServer();