import { NextResponse } from "next/server";
const db = require('../db.js');

export async function GET(request) { // NOT WORKING YET
    const {turtleId} = await request.json();
    const data = await db.getTurtlePublicData(turtleId);
    return NextResponse.json(data);
}