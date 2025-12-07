import fetch from 'node-fetch';

async function testRegister() {
    try {
        const res = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: `test_${Date.now()}@example.com`,
                password: 'password123',
                name: 'Test User'
            })
        });

        const data = await res.json();
        console.log('Registration Status:', res.status);
        console.log('Response:', data);
    } catch (error) {
        console.error('Registration Failed:', error);
    }
}

testRegister();
