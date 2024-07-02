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
    const newEntry = { word, synonym, example };

    try {
        const filePath = path.join(__dirname, 'maranghozov/index.html');
        let vocabList = [];

        // Read existing vocab list from index.html, if any
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            vocabList = JSON.parse(data);
        }

        // Add the new entry to vocabList
        vocabList.push(newEntry);

        // Write updated vocab list back to index.html
        fs.writeFileSync(filePath, JSON.stringify(vocabList));

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
