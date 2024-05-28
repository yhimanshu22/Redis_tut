const client = require('./client');

async function init() {
    try {
        // Add elements to the list from the left
        await client.lpush('messages', 1);
        await client.lpush('messages', 2);

        // Add elements to the list from the right
        await client.rpush('messages', 3);
        await client.rpush('messages', 4);

        // Get the length of the list
        const length = await client.llen('messages');
        console.log('List length:', length);

        // Get all elements in the list
        const allMessages = await client.lrange('messages', 0, -1);
        console.log('All messages:', allMessages);

        // Get the element at a specific index
        const firstMessage = await client.lindex('messages', 0);
        console.log('First message:', firstMessage);

        // Remove and get the first element from the list
        const poppedLeft = await client.lpop('messages');
        console.log('Popped from left:', poppedLeft);

        // Remove and get the last element from the list
        const poppedRight = await client.rpop('messages');
        console.log('Popped from right:', poppedRight);

        // Insert element before another element
        await client.linsert('messages', 'BEFORE', 3, 5);
        const updatedListAfterInsert = await client.lrange('messages', 0, -1);
        console.log('Updated list after insert:', updatedListAfterInsert);

        // Remove elements from the list
        await client.lrem('messages', 1, 3); // Removes the first occurrence of the element 3
        const updatedListAfterRemove = await client.lrange('messages', 0, -1);
        console.log('Updated list after remove:', updatedListAfterRemove);

    } catch (error) {
        // Handle any errors that occur during the async operations
        console.error('Error occurred:', error);
    }
}

init();
