const postgres = require('postgres');
const dotenv = require('dotenv');

dotenv.config();
const { DATABASE_URL } = process.env;
const sql = postgres(DATABASE_URL, { ssl: 'require' });

// CREATE TABLES
async function createRaindropTable() {
    await sql`
        CREATE TABLE public.raindrops(
            "raindrop_id" SERIAL PRIMARY KEY,
            "votes" INT NOT NULL,
            "is_winner" BOOL NOT NULL,
            "position" INT NOT NULL
        );
    `;
}
async function createUsersTable() {
    await sql`
        CREATE TABLE public.users(
        "user_id" SERIAL PRIMARY KEY,
        "raindrop_id" INT NULL,
        "wins" INT NOT NULL,
        "display_name" VARCHAR(20) NOT NULL UNIQUE
      );
    `;
}

// DROP TABLES
async function dropRaindropTable() {
    await sql`DROP TABLE public.raindrops`;
}
async function dropUsersTable() {
    await sql`DROP TABLE public.users`;
}

// ADD ENTRIES
async function addRaindrop() {
    await sql`
        INSERT INTO public.raindrops
        (votes, is_winner, position)
        VALUES (${0}, ${0}, ${0});
    `;
}

async function addUser(displayName) {
    await sql`
        INSERT INTO public.users
        (display_name, wins)
        VALUES (${displayName}, ${0});
    `;
}


["Bob", "Alice", "Tom", "Dick", "Harry"].map((name) => {
    addUser(name);
});