import express from "express"; //imports express as a server
import fetch from "node-fetch"; //Import node-fetch to fetch HTML from external URLs
import * as cheerio from "cheerio"; //Import cheerio to parse HTML like a jQuery DOM
import cors from "cors"; //Import CORS to allow frontend to make requests to this server
import { checkPageScore, isValidUrl } from "./utils/pagehealth.js";

//Creates an express app
const app = express();
app.use(cors()); //Enables CORS
app.use(express.json()); //Parses JSON bodies for POST requests(so we can read req.body)

app.post("/api/check", async (req, res) => {
    const { url } = req.body; //Extract URL sent from the frontend
    console.log(`Received request for URL: ${url}`);

    // Validate the URL first
    if (!isValidUrl(url)) {
        console.log("Invalid URL provided");
        return res.status(400).json({ error: "Invalid URL" });
    }

    try {
        console.log("Fetching URL with node-fetch...");
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 10000
        });
        
        if (!response.ok) {
            console.log(`Fetch failed with status: ${response.status}`);
            return res.status(response.status).json({ error: `Failed to fetch page, status ${response.status}` });
        }
        
        const html = await response.text();
        console.log(`HTML fetched, length: ${html.length}`);

        const $ = cheerio.load(html);
        const result = checkPageScore($);
        console.log(`Analysis complete. Result:`, result);
        return res.json(result);
    } catch (err) {
        console.error("Detailed error:", err.message);
        console.error("Stack:", err.stack);
        return res.status(500).json({ error: `Server error: ${err.message}` });
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
