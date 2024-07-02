// Example addEntry.js function

const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { word, synonym, example } = JSON.parse(event.body);
    const newEntry = `{ word: "${word}", synonym: "${synonym}", example: "${example}" },\n`;

    try {
        const filePath = path.join(__dirname, '../../public/index.html');
        fs.appendFileSync(filePath, newEntry);
        return {
            statusCode: 200,
            body: 'Entry added successfully!',
        };
    } catch (error) {
        console.error('Error adding entry:', error);
        return {
            statusCode: 500,
            body: 'Failed to add entry.',
        };
    }
};
  
