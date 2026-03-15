import express from "express"; //imports express as a server
import fetch from "node-fetch"; // Imports node-fetch to fetch HTML from external URLS
import * as cheerio from "cheerio"; //Import cheerio to parse HTML like a jQuery DOM
import cors from "cors"; //Import CORS to allow frontend to make requests to this server
import { checkPageScore, isValidUrl } from "./utils/pagehealth.js";

//Creates an express app
const app = express();
app.use(cors()); //Enables CORS
app.use(express.json()); //Parses JSON bodies for POST requests(so we can read req.body)

app.post("/api/check", async (req, res) => {
    const { url } = req.body; //Extract URL sent from the frontend

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

        const html = await response.text(); //Get the html from the response

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

// Function to start the server and handle port conflicts
const startServer = (port = process.env.PORT || 5050, attempts = 0) => {
   // Try to start the server on the given port
    const server = app.listen(port, () => console.log(`Server running on port ${port}`));
 // Listen for server errors (like port already in use)
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE' && attempts < 3) {
            // If the port is already in use, try the next port
            const nextPort = Number(port) + 1;
            console.warn(`Port ${port} is in use. Trying port ${nextPort}...`);
            setTimeout(() => startServer(nextPort, attempts + 1), 500);
        } else {
             // If it fails for another reason, log and exit
            console.error('Server failed to start:', err);
            process.exit(1);
        }
    });
};

startServer();
