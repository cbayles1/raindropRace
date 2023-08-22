import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST() {
    try {
        await db.moveAllTurtles();
        return NextResponse.json(db.getAllTurtlesDataNoVel());
    } catch {
        return "The turtles could not be moved.";
    }
}