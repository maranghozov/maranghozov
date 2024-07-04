// addEntry.js - Example Netlify Function for handling POST requests

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { word, synonym, example } = JSON.parse(event.body);
        
        // Here, you would typically add logic to save the entry to your database or perform any other backend operation
        
        // Example: Save entry to database (not implemented here)
        // const savedEntry = await saveEntryToDatabase({ word, synonym, example });

        // For demo purposes, simulate saving entry
        const savedEntry = { id: 1, word, synonym, example };
        
        return {
            statusCode: 200,
            body: JSON.stringify(savedEntry)
        };
    } catch (error) {
        console.error('Error handling POST request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

