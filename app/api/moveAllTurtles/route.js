import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST() {
    try {
        await db.moveAllTurtles();
        return NextResponse.json(db.getAllTurtlesDataNoVel());
    } catch(err) {
        return NextResponse.json({error: "The turtles could not be moved."}, {status: 500});
    }
}