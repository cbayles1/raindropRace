import { NextResponse } from "next/server";
const db = require('../db.js');

export async function GET() {
    try {
        const data = await db.getAllTurtlesDataNoVel();
        return NextResponse.json(data);
    } catch(err) {
        return "There was trouble getting the turtles' data.";
    }
}