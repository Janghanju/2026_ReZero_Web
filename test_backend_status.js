const fetch = require('node-fetch');

async function checkBackend() {
    try {
        console.log('Checking /geek-news...');
        const newsRes = await fetch('http://localhost:3001/geek-news?page=1');
        console.log('News Status:', newsRes.status);
        if (newsRes.ok) {
            const data = await newsRes.json();
            console.log('News Data Count:', data.news ? data.news.length : 'N/A');
        } else {
            console.log('News Error:', await newsRes.text());
        }

        console.log('\nChecking /click-log/top...');
        const topRes = await fetch('http://localhost:3001/click-log/top');
        console.log('Top Status:', topRes.status);
        if (topRes.ok) {
            const data = await topRes.json();
            console.log('Top Data:', JSON.stringify(data, null, 2));
        } else {
            console.log('Top Error:', await topRes.text());
        }

    } catch (error) {
        console.error('Connection Failed:', error.message);
    }
}

checkBackend();
