import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users, turtles } from '../../schema.ts';
import { eq } from "drizzle-orm";

neonConfig.fetchConnectionCache = true;
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

// CREATE TABLES
/*export async function createTurtleTable() {
    await sql`
        CREATE TABLE public.turtles (
            turtle_id SERIAL PRIMARY KEY,
            votes INT NOT NULL,
            is_winner BOOL NOT NULL,
            position REAL NOT NULL,
            velocity REAL NOT NULL
        );
    `;
}
export async function createUsersTable() {
    await sql`
        CREATE TABLE public.users(
        "user_id" SERIAL PRIMARY KEY,
        "turtle_id" INT NULL,
        "wins" INT NOT NULL,
        "display_name" VARCHAR(20) NOT NULL UNIQUE
      );
    `;
}

// DROP TABLES
export async function dropTurtleTable() {
    await sql`DROP TABLE public.turtles`;
}
export async function dropUsersTable() {
    await sql`DROP TABLE public.users`;
}*/

// ADD ENTRIES
export async function addTurtle() {
    const turtle_id = await db.insert(turtles)
        .values({votes: 0, is_winner: false, position: 0, velocity: (Math.random() * 2).toFixed(6)})
        .returning({turtle_id: turtles.turtle_id});
    return turtle_id;
}

export async function addUser(displayName) {
    const user_id = await db.insert(users)
        .values({display_name: displayName, wins: 0, has_voted: false})
        .returning({user_id: users.user_id});
    return user_id;
}

// DELETE ENTRIES
export async function deleteUser(userId) {
    const turtleId = await getTurtleIdFromUser(userId);
    const turtleVotes = await getTurtleVotes(turtleId);
    await db.update(turtles).set({votes: turtleVotes - 1}).where(eq(turtles.turtle_id, turtleId));
    await db.delete(users).where(eq(users.user_id, userId));
}

export async function deleteTurtle(turtleId) {
    await db.delete(turtles).where(eq(turtles.turtle_id, turtleId));
    await db.update(users).set({turtle_id: null}).where(eq(users.turtle_id, turtleId));
}

// UPDATE DATA
export async function vote(userId, turtleId) {
    const prevTurtleId = await getTurtleIdFromUser(userId);
    if (prevTurtleId != null) {
        throw "You already voted!";
    } else {
        const turtleVotes = await getTurtleVotes(turtleId);
        await db.update(turtles).set({votes: (turtleVotes + 1)}).where(eq(turtles.turtle_id, turtleId));
        await db.update(users).set({turtle_id: turtleId}).where(eq(users.user_id, userId));
    }
}

// GET DATA
export async function getTurtlePublicData(turtleId) {
    const result = await db.select({
        votes: turtles.votes,
        isWinner: turtles.is_winner,
        position: turtles.position
        }).from(turtles).where(eq(turtles.turtle_id, turtleId));
    try {
        return result[0];
    } catch {
        throw "That turtle does not exist.";
    }
}

export async function getAllTurtlesPublicData() {
    const result = await db.select({
        votes: turtles.votes,
        isWinner: turtles.is_winner,
        position: turtles.position
        }).from(turtles);
    try {
        return result;
    } catch {
        throw "There are no turtles right now.";
    }
}

async function getTurtleVotes(turtleId) {
    const result = await db.select({
        votes: turtles.votes
        }).from(turtles).where(eq(turtles.turtle_id, turtleId));
    try {
        return result[0].votes;
    } catch {
        throw "That turtle does not exist.";
    }
}

async function getTurtleIdFromUser(userId) {
    const result = await db.select({
        id: users.turtle_id
        }).from(users).where(eq(users.user_id, userId));
    try {
        return result[0].id;
    } catch {
        throw "That user does not exist.";
    }
}

// RESET COLUMNS
