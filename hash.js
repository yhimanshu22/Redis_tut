const client = require('./client.js');

async function init() {
    try {
        // Set fields in a hash
        await client.hset("user:1000", "name", "John Doe");
        await client.hset("user:1000", "email", "john.doe@example.com");
        await client.hset("user:1000", "age", 30);

        // Retrieve a specific field from the hash
        const name = await client.hget("user:1000", "name");
        console.log("Name ->", name);

        // Retrieve all fields and values from the hash
        const user = await client.hgetall("user:1000");
        console.log("User ->", user);

        // Check if a specific field exists in the hash
        const emailExists = await client.hexists("user:1000", "email");
        console.log("Does email field exist? ->", emailExists);

        // Delete a specific field from the hash
        await client.hdel("user:1000", "age");
        const userAfterDelete = await client.hgetall("user:1000");
        console.log("User after deleting age ->", userAfterDelete);

        // Get all the field names in the hash
        const fields = await client.hkeys("user:1000");
        console.log("Fields in user hash ->", fields);

        // Get all the values in the hash
        const values = await client.hvals("user:1000");
        console.log("Values in user hash ->", values);

        // Get the number of fields in the hash
        const fieldCount = await client.hlen("user:1000");
        console.log("Number of fields in user hash ->", fieldCount);

        // Set multiple fields in a hash at once
        await client.hmset("user:1000", "location", "New York", "phone", "123-456-7890");
        const updatedUser = await client.hgetall("user:1000");
        console.log("Updated user ->", updatedUser);

        // Get multiple fields from the hash at once
        const multipleFields = await client.hmget("user:1000", "name", "location", "phone");
        console.log("Multiple fields ->", multipleFields);

    } catch (error) {
        // Handle any errors that occur during the async operations
        console.error('Error occurred:', error);
    }
}

init();
