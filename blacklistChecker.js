const axios = require('axios');
require('dotenv').config();
// Replace 'YOUR_API_KEY' with your actual Google Safe Browsing API key
const API_KEY = process.env.GOOGLE_API_KEY;

// Function to check if a URL is blacklisted
async function checkBlacklistStatus(domain) {
    const url = `http://${domain}`;
    try {
        const response = await axios.post(
            `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
            {
                client: {
                    clientId: "your-client-id",
                    clientVersion: "1.0"
                },
                threatInfo: {
                    threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                    platformTypes: ["ANY_PLATFORM"],
                    threatEntryTypes: ["URL"],
                    threatEntries: [
                        { url: url }
                    ]
                }
            }
        );

        if (response.data.matches) {
            console.log(`Warning: The URL "${url}" is blacklisted.`);
            response.data.matches.forEach((match) => {
                console.log(`Threat Type: ${match.threatType}`);
                console.log(`Platform Type: ${match.platformType}`);
            });
        } else {
            console.log(`The URL "${url}" is safe.`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Usage example
checkBlacklistStatus("torrent.com");

