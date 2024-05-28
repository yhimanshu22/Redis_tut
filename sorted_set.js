const client = require('./client.js');

async function init() {
    try {
        // Add elements to a sorted set with scores
        await client.zadd("leaders", 100, "Alice");
        await client.zadd("leaders", 200, "Bob");
        await client.zadd("leaders", 50, "Charlie");
        await client.zadd("leaders", 150, "David");

        // Retrieve all elements in the sorted set ordered by score (ascending)
        const leadersAsc = await client.zrange("leaders", 0, -1);
        console.log("Leaders in ascending order ->", leadersAsc);

        // Retrieve all elements in the sorted set ordered by score (descending)
        const leadersDesc = await client.zrevrange("leaders", 0, -1);
        console.log("Leaders in descending order ->", leadersDesc);

        // Retrieve elements and their scores in the sorted set ordered by score (ascending)
        const leadersWithScoresAsc = await client.zrange("leaders", 0, -1, "WITHSCORES");
        console.log("Leaders with scores in ascending order ->", leadersWithScoresAsc);

        // Retrieve elements and their scores in the sorted set ordered by score (descending)
        const leadersWithScoresDesc = await client.zrevrange("leaders", 0, -1, "WITHSCORES");
        console.log("Leaders with scores in descending order ->", leadersWithScoresDesc);

        // Check the score of a specific member in the sorted set
        const bobScore = await client.zscore("leaders", "Bob");
        console.log("Bob's score ->", bobScore);

        // Remove an element from the sorted set
        await client.zrem("leaders", "Charlie");
        const leadersAfterRemove = await client.zrange("leaders", 0, -1);
        console.log("Leaders after removing Charlie ->", leadersAfterRemove);

        // Get the number of elements in the sorted set
        const leadersCount = await client.zcard("leaders");
        console.log("Number of leaders ->", leadersCount);

        // Count the number of elements in the sorted set within a specific score range
        const countInRange = await client.zcount("leaders", 50, 150);
        console.log("Number of leaders with scores between 50 and 150 ->", countInRange);

        // Get the rank of a specific element in the sorted set (0-based index, ascending)
        const aliceRank = await client.zrank("leaders", "Alice");
        console.log("Alice's rank (ascending) ->", aliceRank);

        // Get the rank of a specific element in the sorted set (0-based index, descending)
        const davidRevRank = await client.zrevrank("leaders", "David");
        console.log("David's rank (descending) ->", davidRevRank);

    } catch (error) {
        // Handle any errors that occur during the async operations
        console.error('Error occurred:', error);
    }
}

init();
