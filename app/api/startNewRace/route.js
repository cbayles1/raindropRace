import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST() {
    try {
        const turtles = await db.startNewRace();
        return NextResponse.json(turtles);
    } catch(err) {
        return NextResponse.json({error: "The race could not be started."}, {status: 500});
    }
}