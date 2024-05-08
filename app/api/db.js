import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users, turtles } from '../../schema.ts';
import { eq, sql } from "drizzle-orm";

neonConfig.fetchConnectionCache = true;
const neonConnection = neon(process.env.DATABASE_URL);
const db = drizzle(neonConnection);

const FINISH_LINE = 100;

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
    try {
        const turtleId = await getTurtleIdFromUser(userId);
        const turtleVotes = await getTurtleVotes(turtleId);
        await db.update(turtles).set({votes: turtleVotes - 1}).where(eq(turtles.turtle_id, turtleId));
    } catch {
        console.log("User who never voted was deleted.");
    } finally {
        await db.delete(users).where(eq(users.user_id, userId));
    }
}

// UPDATE DATA
export async function vote(userId, turtleId) {
    const prevTurtleId = await getTurtleIdFromUser(userId);
    if (prevTurtleId != null) {
        //throw "You already voted!";
        let turtleVotes = await getTurtleVotes(prevTurtleId);
        await db.update(turtles).set({votes: (turtleVotes - 1)}).where(eq(turtles.turtle_id, prevTurtleId));
    }
    let turtleVotes = await getTurtleVotes(turtleId);
    await db.update(turtles).set({votes: (turtleVotes + 1)}).where(eq(turtles.turtle_id, turtleId));
    await db.update(users).set({turtle_id: turtleId}).where(eq(users.user_id, userId));
}

async function updateTurtlePosAndVel(turtle) {
    await db.update(turtles).set({
        position: turtle.position,
        velocity: turtle.velocity,
    }).where(eq(turtles.turtle_id, turtle.turtle_id));
}

// GET DATA
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

export async function getTurtleIdFromUser(userId) {
    const result = await db.select({
        id: users.turtle_id
        }).from(users).where(eq(users.user_id, userId));
    try {
        return result[0].id;
    } catch {
        throw "That user does not exist.";
    }
}

export async function getAllTurtlesDataNoVel() {
    const result = await db.select({
        id: turtles.turtle_id,
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

// BROAD GAME SCOPE
export async function startNewRace() {
    const turtleNames = ["Bubbles", "Goldie", "Mikey", "Raph", "Leo", "Donnie", "Bugs", "Sonic", "Sarge", "Speedy", "Koopa", "Yertle", "Oogway", "Molasses", "Sheldon", "Shelly", "Humphrey", "Henry", "George"];
    turtleNames.sort(() => Math.random() - 0.5);
    const pickedNames = turtleNames.slice(0, 5);

    await db.update(users).set({turtle_id: null});
    await db.delete(turtles);
    const untitled = pickedNames.map(async (name) => await addTurtle(name));
    const turtleIds = await Promise.all(untitled);
    return turtleIds;
}

export async function moveAllTurtles() {
    let allTurtles = await db.select().from(turtles);
    let winningTurtleId = null;

    allTurtles.map((turtle) => {
        turtle.position += turtle.velocity;
        turtle.position = turtle.position.toFixed(6);
        
        let randomSign = Math.round(Math.random()) * 2 - 1;
        turtle.velocity += Math.random() * 8 * randomSign;
        turtle.velocity = turtle.velocity.toFixed(6);
        if (turtle.velocity < 0) {
            turtle.velocity = 0.0;
        }

        updateTurtlePosAndVel(turtle);

        if (turtle.position >= 100 && !winningTurtleId) {
            winningTurtleId = turtle.turtle_id;
        }
    });
    
    if (winningTurtleId) {
        await db.update(turtles).set({is_winner: true}).where(eq(turtles.turtle_id, winningTurtleId));
        await db.update(users).set({wins: sql`${users.wins} + 1`}).where(eq(users.turtle_id, winningTurtleId));
        await startNewRace();
    }
}

export async function getWinners() {
    let allTurtles = await db.select().from(turtles);
    const winners = [];
    allTurtles.forEach((turtle) => {
        if (turtle.is_winner) {
            winners.push(turtle);
        }
    });
    return winners;
}