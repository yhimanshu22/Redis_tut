const express = require('express');
const axios = require('axios');

const client = require('./client');

const app = express();

// Middleware to cache the response using Redis
const cacheMiddleware = async (req, res, next) => {
    try {
        const cacheValue = await client.get('todos');
        if (cacheValue) {
            console.log('Cache hit!');
            return res.json(JSON.parse(cacheValue));
        }
        console.log('Cache miss!');
        next(); // Proceed to the route handler if cache is not found
    } catch (error) {
        console.error('Error in cacheMiddleware:', error);
        next(); // Proceed to the route handler in case of an error
    }
};

app.get('/', cacheMiddleware, async (req, res) => {
    try {
        // Fetch data from external API
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
        
        // Cache the fetched data in Redis for 30 seconds
        await client.set('todos', JSON.stringify(data));
        await client.expire('todos', 30);
        
        return res.json(data);
    } catch (error) {
        console.error('Error in GET /:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
