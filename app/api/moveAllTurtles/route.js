import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST() {
    try {
        const allTurtlesPos = await db.moveAllTurtles();
        return NextResponse.json(allTurtlesPos);
    } catch {
        return "The turtles could not be moved.";
    }
}