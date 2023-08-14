const postgres = require('postgres');
const dotenv = require('dotenv');

dotenv.config();
const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

// CREATE TABLES
async function createRaindropTable() {
    await sql`
        CREATE TABLE public.raindrops (
            raindrop_id SERIAL PRIMARY KEY,
            votes INT NOT NULL,
            is_winner BOOL NOT NULL,
            position INT NOT NULL,
            velocity INT NOT NULL
        );
    `;
}
async function createUsersTable() {
    await sql`
        CREATE TABLE public.users(
        "user_id" SERIAL PRIMARY KEY,
        "raindrop_id" INT NULL,
        "wins" INT NOT NULL,
        "display_name" VARCHAR(20) NOT NULL UNIQUE,
        "has_voted" BOOL NOT NULL
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
        (display_name, wins, has_voted)
        VALUES (${displayName}, ${0}, ${0});
    `;
}

// REMOVE ENTRIES


// RESET COLUMNS


// GET DATA
async function getRaindropPublicData(raindrop_id) {
    await sql`
        SELECT votes, is_winner, position FROM public.raindrops
        WHERE raindrop_id = ${raindrop_id};
    `
    .then((result) => {
        console.log(result[0]);
    });
}

// POST DATA
async function vote(user_id, raindrop_id) {
    /*if (userHasVoted(user_id)) {
        throw "You already voted!";
    } else {
        */await sql`
            UPDATE public.users
            SET raindrop_id = ${raindrop_id}, has_voted = ${true}
            WHERE user_id = ${user_id};
        `;
        await sql`
            UPDATE public.raindrops
            SET votes = votes + 1
            WHERE raindrop_id = ${raindrop_id};
        `;
    //}
}

// OTHER FUNCTIONS
async function userHasVoted(userId) { // TODO: NOT WORKING RIGHT, NOT USED FOR NOW
    sql`
        SELECT has_voted FROM public.users
        WHERE user_id = ${userId};
    `.then((result) => {
        if (result[0]['has_voted'] == true) {
            return true;
        } else {
            return false;
        }
    });
    
}
