import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST(request) {
    const {turtleId} = await request.json();
    db.deleteTurtle(turtleId);
    return NextResponse.json({});
}