const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const dataPath = path.resolve(__dirname, '../vocabulary.json');
    const newEntry = JSON.parse(event.body);

    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        const vocabList = JSON.parse(data);

        vocabList.push(newEntry);

        fs.writeFileSync(dataPath, JSON.stringify(vocabList, null, 2), 'utf8');

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Entry added successfully!' }),
        };
    } catch (error) {
        console.error('Error updating vocabulary.json:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
};
