const client = require('./client.js');

async function init() {
    try {
        // Set a string value
        await client.set("msg:6", "Hey from Node.js");

        // Set a key to expire after 10 seconds
        await client.expire("msg:6", 10);

        // Get the value of a string key
        const result = await client.get("msg:6");
        console.log("Result ->", result);

        // Append a value to an existing string
        await client.append("msg:6", " - Appended text");
        const appendedResult = await client.get("msg:6");
        console.log("Appended Result ->", appendedResult);

        // Get the length of a string value
        const length = await client.strlen("msg:6");
        console.log("String length ->", length);

        // Increment a string integer value
        await client.set("count", 0);
        await client.incr("count");
        const incrementedCount = await client.get("count");
        console.log("Incremented count ->", incrementedCount);

        // Decrement a string integer value
        await client.decr("count");
        const decrementedCount = await client.get("count");
        console.log("Decremented count ->", decrementedCount);

        // Set multiple string values
        await client.mset("msg:7", "Hello", "msg:8", "World");
        const multipleResults = await client.mget("msg:6", "msg:7", "msg:8");
        console.log("Multiple results ->", multipleResults);

        // Optionally, you can wait a bit to show the expiration
        console.log("Waiting 10 seconds for key expiration...");
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Check if the key has expired
        const expiredResult = await client.get("msg:6");
        console.log("Result after expiration ->", expiredResult);

    } catch (error) {
        // Handle any errors that occur during the async operations
        console.error('Error occurred:', error);
    }
}

init();
