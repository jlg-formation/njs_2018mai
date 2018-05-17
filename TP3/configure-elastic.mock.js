const elasticsearch = require('elasticsearch');
const client = {
    bulk: function() {},
    ping: function() {},
    indices: {
        create: () => {},
        delete: () => {},
        exists: () => true,
    }
}

async function configure() {
    await client.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: 1000
    });
    console.log('Elasticsearch is on.');
    const alreadyExists = await client.indices.exists({
        index: 'client'
    });
    if (alreadyExists) {
        console.log('Elasticsearch index client already exists.');
        await client.indices.delete({
            index: 'client'
        });
        console.log('Elasticsearch index client deleted.');
    }
    await client.indices.create({
        index: 'client'
    });
    console.log('Elasticsearch index client created.');
}

module.exports = { configure, client };