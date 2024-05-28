const client = require('./client.js');

async function init() {
    try {
        // Add entries to the stream
        await client.xadd('mystream', '*', 'field1', 'value1');
        await client.xadd('mystream', '*', 'field2', 'value2');
        await client.xadd('mystream', '*', 'field3', 'value3');

        // Read entries from the stream
        const streamEntries = await client.xrange('mystream', '-', '+');
        console.log('Stream Entries ->', streamEntries);

        // Add entries to a consumer group
        await client.xgroup('CREATE', 'mystream', 'mygroup', '$', 'MKSTREAM');
        await client.xadd('mystream', '*', 'field4', 'value4');
        await client.xadd('mystream', '*', 'field5', 'value5');

        // Read entries from the stream using a consumer group
        const consumerGroupEntries = await client.xreadgroup('GROUP', 'mygroup', 'consumer1', 'STREAMS', 'mystream', '>');
        console.log('Consumer Group Entries ->', consumerGroupEntries);

        // Acknowledge a message in the stream
        if (consumerGroupEntries && consumerGroupEntries.length > 0) {
            const messages = consumerGroupEntries[0][1];
            for (const message of messages) {
                await client.xack('mystream', 'mygroup', message[0]);
            }
        }

        // Get the length of the stream
        const streamLength = await client.xlen('mystream');
        console.log('Stream Length ->', streamLength);

        // Get information about the stream
        const streamInfo = await client.xinfo('STREAM', 'mystream');
        console.log('Stream Info ->', streamInfo);

        // Trim the stream to retain only the most recent N entries
        await client.xtrim('mystream', 'MAXLEN', '~', 2);
        const trimmedStreamEntries = await client.xrange('mystream', '-', '+');
        console.log('Trimmed Stream Entries ->', trimmedStreamEntries);

    } catch (error) {
        // Handle any errors that occur during the async operations
        console.error('Error occurred:', error);
    }
}

init();
