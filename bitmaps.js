const client = require('./client.js');

async function init() {
    try {
        // Set bits at specified offsets
        await client.setbit('user:1000:loggedin', 0, 1);
        await client.setbit('user:1000:loggedin', 2, 1);
        await client.setbit('user:1000:loggedin', 5, 1);
        await client.setbit('user:1000:loggedin', 7, 1);

        // Check if a bit is set at a specified offset
        const bitAtOffset5 = await client.getbit('user:1000:loggedin', 5);
        console.log('Bit at offset 5 ->', bitAtOffset5);

        // Perform bitwise AND operation between multiple bitmaps
        await client.setbit('user:1001:loggedin', 2, 1);
        await client.setbit('user:1001:loggedin', 5, 1);
        await client.bitop('AND', 'user:1000&1001:loggedin', 'user:1000:loggedin', 'user:1001:loggedin');

        // Count the number of set bits in a bitmap
        const bitCount = await client.bitcount('user:1000&1001:loggedin');
        console.log('Number of set bits ->', bitCount);

        // Perform bitwise OR operation between multiple bitmaps
        await client.bitop('OR', 'user:1000|1001:loggedin', 'user:1000:loggedin', 'user:1001:loggedin');

        // Perform bitwise XOR operation between multiple bitmaps
        await client.bitop('XOR', 'user:1000^1001:loggedin', 'user:1000:loggedin', 'user:1001:loggedin');

        // Perform bitwise NOT operation on a bitmap
        await client.bitop('NOT', 'user:1000:notloggedin', 'user:1000:loggedin');

        // Get the string representation of a bitmap
        const bitmapString = await client.dump('user:1000:loggedin');
        console.log('Bitmap string representation ->', bitmapString);

    } catch (error) {
        // Handle any errors that occur during the async operations
        console.error('Error occurred:', error);
    }
}

init();
