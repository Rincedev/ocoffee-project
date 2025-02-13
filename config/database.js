import pg from 'pg'; 

const { Client } = pg;

const client = new Client(process.env.PG_URL);

await client.connect();

export default client;
