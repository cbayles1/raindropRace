import { NextResponse } from "next/server";
const db = require('../db.js');

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const turtleId = searchParams.get('turtleId');
    try {
        const data = await db.getTurtlePublicData(turtleId);
        return NextResponse.json(data);
    } catch {
        throw "There was trouble getting the turtle's data.";
    }
}