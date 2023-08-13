const postgres = require('postgres');
const dotenv = require('dotenv');

dotenv.config();
const { DATABASE_URL } = process.env;
const sql = postgres(DATABASE_URL, { ssl: 'require' });

async function createRaindropTable() {
    await sql`
        CREATE TABLE raindrops(
            "raindrop_id" SERIAL PRIMARY KEY,
            "votes" INT NOT NULL,
            "is_winner" BOOL NOT NULL,
            "position" INT NOT NULL
        );
    `;
}

async function addRaindrop() {
    await sql`
        INSERT INTO public.raindrops
        (votes, is_winner, position)
        VALUES (${0}, ${0}, ${0});
    `;
}

//createRaindropTable();
addRaindrop();