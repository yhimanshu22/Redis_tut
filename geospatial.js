const client = require('./client.js');

async function init() {
    try {
        // Add geospatial items to a sorted set
        await client.geoadd('locations', 13.361389, 38.115556, 'Palermo');
        await client.geoadd('locations', 15.087269, 37.502669, 'Catania');
        await client.geoadd('locations', 12.496366, 41.902783, 'Rome');

        // Get the position of an item
        const palermoPosition = await client.geopos('locations', 'Palermo');
        console.log('Palermo Position ->', palermoPosition);

        // Get the distance between two items
        const distance = await client.geodist('locations', 'Palermo', 'Catania', 'km');
        console.log('Distance between Palermo and Catania ->', distance);

        // Get the members within a given radius
        const nearbyLocations = await client.georadius('locations', 13.361389, 38.115556, 200, 'km');
        console.log('Locations within 200km of Palermo ->', nearbyLocations);

        // Get the members within a given radius by member name
        const nearbyByMember = await client.georadiusbymember('locations', 'Palermo', 200, 'km');
        console.log('Locations within 200km of Palermo by member ->', nearbyByMember);

        // Get the geohash of an item
        const palermoGeohash = await client.geohash('locations', 'Palermo');
        console.log('Palermo Geohash ->', palermoGeohash);

        // Get the distance between two items with coordinates
        const romeDistance = await client.geodist('locations', 'Rome', 'Catania', 'km');
        console.log('Distance between Rome and Catania ->', romeDistance);

    } catch (error) {
        // Handle any errors that occur during the async operations
        console.error('Error occurred:', error);
    }
}

init();
