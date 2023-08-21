import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users, turtles } from '../../schema.ts';
import { eq, sql } from "drizzle-orm";

neonConfig.fetchConnectionCache = true;
const neonConnection = neon(process.env.DATABASE_URL);
const db = drizzle(neonConnection);

const FINISH_LINE = 100;

// CREATE TABLES
/*export async function createTurtleTable() {
    await sql`
        CREATE TABLE public.turtles (
            turtle_id SERIAL PRIMARY KEY,
            name VARCHAR(20) NOT NULL UNIQUE
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
        "name" VARCHAR(20) NOT NULL UNIQUE
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
async function addTurtle(name) {
    const result = await db.insert(turtles)
        .values({name: name, votes: 0, is_winner: false, position: 0, velocity: (Math.random() * 2).toFixed(6)})
        .returning({turtle_id: turtles.turtle_id});
    return result[0].turtle_id;
}

export async function addUser(name) {
    const result = await db.insert(users)
        .values({name: name, wins: 0, has_voted: false})
        .returning({user_id: users.user_id});
    return result[0].user_id;
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

async function updateTurtlePosAndVel(turtle) {
    await db.update(turtles).set({
        position: turtle.position,
        velocity: turtle.velocity,
    }).where(eq(turtles.turtle_id, turtle.turtle_id));
}

// GET DATA
export async function getTurtlePublicData(turtleId) {
    const result = await db.select({
        name: turtles.name,
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
        name: turtles.name,
        votes: turtles.votes,
        isWinner: turtles.is_winner,
        position: turtles.position
        }).from(turtles);
    try {
        return result;
    } catch {
        throw "There was trouble getting the turtles' data.";
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

async function getAllTurtlesPosAndVel() {
    const result = await db.select({
        pos: turtles.position,
        vel: turtles.velocity,
    }).from(turtles);
    try {
        return result;
    } catch {
        throw "Position and velocity could not be found.";
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

// BROAD GAME SCOPE
export async function startNewRace() {
    const turtleNames = ["Bubbles", "Goldie", "Mikey", "Raph", "Leo", "Donnie", "Bugs", "Sonic", "Sarge", "Speedy Gonzales", "Koopa", "Yertle", "Oogway", "Molasses", "Sheldon", "Shelly", "Humphrey", "Henry", "George"];
    turtleNames.sort(() => Math.random() - 0.5);
    const pickedNames = turtleNames.slice(0, 5);

    await db.update(users).set({turtle_id: null});
    await db.delete(turtles);
    const arr = pickedNames.map(async (name) => await addTurtle(name));
    const turtleIds = await Promise.all(arr);
    return turtleIds;
}

export async function moveAllTurtles() {
    let allTurtles = await db.select().from(turtles);
    let newPos = [];
    let winningTurtleId = null;

    for (let i = 0; i < 5; i++) { // CHANGE 5
        allTurtles[i].position += allTurtles[i].velocity;
        allTurtles[i].position = allTurtles[i].position.toFixed(6);
        
        let randomSign = Math.round(Math.random()) * 2 - 1;
        allTurtles[i].velocity += Math.random() * 4.001 * randomSign;
        allTurtles[i].velocity = allTurtles[i].velocity.toFixed(6);
        if (allTurtles[i].velocity < 0) {
            allTurtles[i].velocity = 0.0;
        }

        updateTurtlePosAndVel(allTurtles[i]);
        newPos.push(allTurtles[i].position);
        
        if (allTurtles[i].position >= 100 && !winningTurtleId) {
            winningTurtleId = allTurtles[i].turtle_id;
        }
    }
    
    if (winningTurtleId) {
        await db.update(turtles).set({is_winner: true}).where(eq(turtles.turtle_id, winningTurtleId));
        await db.update(users).set({wins: sql`${users.wins} + 1`}).where(eq(users.turtle_id, winningTurtleId));
        await startNewRace();
    }

    return newPos;
}