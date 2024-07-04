// netlify/functions/addEntry.js

const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { word, synonym, example } = JSON.parse(event.body);
        
        // Read current vocabulary list
        const vocabFilePath = path.resolve(__dirname, 'vocabulary.json');
        let vocabList = JSON.parse(fs.readFileSync(vocabFilePath, 'utf8'));

        // Add new entry
        const newEntry = { word, synonym, example };
        vocabList.push(newEntry);

        // Write updated vocabulary list back to file
        fs.writeFileSync(vocabFilePath, JSON.stringify(vocabList, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Entry added successfully' })
        };
    } catch (error) {
        console.error('Error handling POST request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

