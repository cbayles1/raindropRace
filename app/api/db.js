import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users, turtles } from '../../schema.ts';
import { eq, sql } from "drizzle-orm";

neonConfig.fetchConnectionCache = true;
const neonConnection = neon(process.env.DATABASE_URL);
const db = drizzle(neonConnection);

const FINISH_LINE = 100;


// TO RESTART IDs:
// SQL:
//     ALTER SEQUENCE users_user_id_seq RESTART WITH 1;
//     DELETE from public.turtles;
//     DELETE from public.users; // optional
// JS:
//     startNewRace();

// ADD ENTRIES
async function addTurtle(name) {
    const result = await db.insert(turtles)
        .values({name: name, votes: 0, is_winner: false, position: 0, velocity: (Math.random() * 2).toFixed(6)})
        .returning({turtle_id: turtles.turtle_id});
    return result[0].turtle_id;
}

export async function addUser(name, email) {
    const result = await db.insert(users)
        .values({name: name, wins: 0, has_voted: false, email: email})
        .returning({id: users.user_id});
    return result[0];
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

async function setUserName(userId, name) {
    await db.update(users).set({name: name}).where(eq(users.user_id, userId));
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
        turtle_id: users.turtle_id
    }).from(users).where(eq(users.user_id, userId));
    
    try {
        return result[0].turtle_id;
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

export async function getWinningTurtles() {
    let allTurtles = await db.select().from(turtles);
    const winners = [];
    allTurtles.forEach((turtle) => {
        if (turtle.is_winner) {
            winners.push(turtle);
        }
    });
    return winners;
}

export async function getUserWins(userId) {
    const result = await db.select({
        wins: users.wins
    }).from(users).where(eq(users.user_id, userId));
    
    try {
        return result[0].wins;
    } catch {
        throw "That user does not exist.";
    }
}

export async function getLeaderboard(size) {
    let result = await db.select({
        id: users.user_id,
        name: users.name,
        wins: users.wins
    }).from(users).limit(size);

    result.sort((a, b) => {
        return b.wins - a.wins;
    });

    return result;
}

export async function getUserByEmail(email) {
    const result = await db.select({
        id: users.user_id,
        name: users.name
    }).from(users).where(eq(users.email, email));
    
    try {
        return result[0];
    } catch {
        throw "That user does not exist.";
    }
}

// BROAD GAME SCOPE
async function startNewRace(numTurtles=5) {
    const turtleNames = ["Bubbles", "Goldie", "Mikey", "Raph", "Leo", "Donnie", "Bugs", "Sonic", "Sarge", "Speedy", "Koopa", "Yertle", "Oogway", "Molasses", "Sheldon", "Shelly", "Humphrey", "Henry", "George"];
    turtleNames.sort(() => Math.random() - 0.5);
    const pickedNames = turtleNames.slice(0, numTurtles);

    await db.update(users).set({turtle_id: null});
    await db.delete(turtles);
    const untitled = pickedNames.map(async (name) => await addTurtle(name));
    let turtleIds = await Promise.all(untitled);
    //turtleIds = turtleIds.slice(0, numTurtles); // attempt at preventing the occasional doubled amount of turtles, didn't work
    return turtleIds;
}

export async function moveAllTurtles() {
    let allTurtles = await db.select().from(turtles);
    let winningTurtleId = null;

    if (allTurtles.length <= 0) {
        await startNewRace();
    }

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

    //const data = await getAllTurtlesDataNoVel();
    //return data;
}

export async function loginOrRegister(name, email) {
    try {
        let res = null;
        res = await getUserByEmail(email);
        if (res) {
            if (res.name != name) {
                res = await setUserName(userId, name);
            }
        } else {
            res  = await addUser(name, email);
        }
        return res.id;
    } catch (err) {
        throw "Something went wrong during loginOrRegister.";
    }
}