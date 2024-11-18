// async function getWhoisData(domain) {
//     const apiKey = 'Q9RSWChiyPC-E1IuzY--9w'; // Replace with your actual API key
//     const apiUrl = 'https://jsonwhoisapi.com/api/v1/whois';

//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Token ${apiKey}`
//             },
//             body: JSON.stringify({ domain })
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         return data; // Returns WHOIS data as a JavaScript object
//     } catch (error) {
//         console.error('Failed to fetch WHOIS data:', error.message);
//         return null;
//     }
// }

// // Example usage
// (async () => {
//     const domain = "google.com"; // Replace with the domain you want to check
//     const whoisData = await getWhoisData(domain);

//     if (whoisData) {
//         console.log("WHOIS Data:", whoisData);
//     } else {
//         console.log("Failed to retrieve WHOIS data.");
//     }
// })();

var unirest = require('unirest');

unirest.get('https://api.jsonwhoisapi.com/v1/whois?identifier=omegle.com')
 .headers({
    'Accept': 'application/json',
    'Authorization': 'Token Q9RSWChiyPC-E1IuzY--9w'
 })

   .query({
      "domain": "omegle.com"
       })

   .end(function (response) {
        console.log(response.body);
});