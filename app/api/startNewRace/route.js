import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST() {
    try {
        const turtles = await db.startNewRace();
        return NextResponse.json(turtles);
    } catch(err) {
        return "The race could not be started.";
    }
}