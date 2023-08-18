import { NextResponse } from "next/server";
const db = require('../db.js');

export async function GET() {
    try {
        const data = await db.getAllTurtlesPublicData();
        return NextResponse.json(data);
    } catch {
        throw "There was trouble getting the turtles' data.";
    }
}