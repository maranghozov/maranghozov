const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    console.log('Function execution started.');

    if (event.httpMethod !== 'POST') {
        console.log('Invalid HTTP method:', event.httpMethod);
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        console.log('Received request body:', event.body);
        const { word, synonym, example } = JSON.parse(event.body);

        console.log('Parsed request body:', { word, synonym, example });

        const vocabFilePath = path.resolve(__dirname, 'vocabulary.json');
        console.log('Resolved file path:', vocabFilePath);

        if (!fs.existsSync(vocabFilePath)) {
            console.error('File not found:', vocabFilePath);
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'File Not Found' })
            };
        }

        console.log('Reading existing vocabulary list.');
        let vocabList = JSON.parse(fs.readFileSync(vocabFilePath, 'utf8'));
        console.log('Current vocabulary list:', vocabList);

        const newEntry = { word, synonym, example };
        console.log('Adding new entry:', newEntry);
        vocabList.push(newEntry);

        console.log('Writing updated vocabulary list to file.');
        fs.writeFileSync(vocabFilePath, JSON.stringify(vocabList, null, 2));

        console.log('New entry added successfully.');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Entry added successfully' })
        };
    } catch (error) {
        console.error('Error occurred:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
