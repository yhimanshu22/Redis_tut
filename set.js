const client = require('./client.js');

async function init() {
    try {
        // Add elements to a set
        await client.sadd("myset", "Hello");
        await client.sadd("myset", "World");
        await client.sadd("myset", "Node.js");
        await client.sadd("myset", "Redis");

        // Retrieve all elements from the set
        const allMembers = await client.smembers("myset");
        console.log("All members of myset ->", allMembers);

        // Check if a specific element is in the set
        const isMember = await client.sismember("myset", "Node.js");
        console.log("Is 'Node.js' a member of myset? ->", isMember);

        // Remove an element from the set
        await client.srem("myset", "Redis");
        const membersAfterRemove = await client.smembers("myset");
        console.log("Members of myset after removing 'Redis' ->", membersAfterRemove);

        // Get the number of elements in the set
        const setCardinality = await client.scard("myset");
        console.log("Number of elements in myset ->", setCardinality);

        // Add elements to another set
        await client.sadd("otherset", "Hello");
        await client.sadd("otherset", "Redis");
        await client.sadd("otherset", "Database");

        // Perform a union of two sets
        const unionSet = await client.sunion("myset", "otherset");
        console.log("Union of myset and otherset ->", unionSet);

        // Perform an intersection of two sets
        const intersectSet = await client.sinter("myset", "otherset");
        console.log("Intersection of myset and otherset ->", intersectSet);

        // Remove and return a random element from the set
        const randomMember = await client.spop("myset");
        console.log("Randomly removed member from myset ->", randomMember);
        const membersAfterPop = await client.smembers("myset");
        console.log("Members of myset after popping a random member ->", membersAfterPop);

    } catch (error) {
        // Handle any errors that occur during the async operations
        console.error('Error occurred:', error);
    }
}

init();
