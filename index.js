const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Use Middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dddlo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const servicesCollection = client.db("Dreamer-Car").collection("service");

        app.get('/service', async (req, res) => {
            const services = await servicesCollection.find().toArray();
            res.send(services);
        })
    } finally {

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from Dreamer Car');
});

app.listen(port, () => {
    console.log('Listening the port', port);
});