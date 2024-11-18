async function checkBlacklistStatus(url) {
    const apiKey = 'YOUR_GOOGLE_SAFE_BROWSING_API_KEY';  // Replace with your API key
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

    const requestBody = {
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
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data && data.matches) {
            return { status: "blacklisted", details: data.matches };
        } else {
            return { status: "safe", details: null };
        }
    } catch (error) {
        console.error("Error checking blacklist status:", error);
        return { status: "error", details: error.message };
    }
}

// Usage example:
checkBlacklistStatus("http://example.com")
    .then(result => console.log(result))
    .catch(error => console.error(error));
