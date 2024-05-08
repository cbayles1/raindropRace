import { NextResponse } from "next/server";
const db = require('../db.js');

export async function GET() {
    try {
        //const data = await db.moveAllTurtles();
        //return NextResponse.json(data);
        await db.moveAllTurtles();
        return NextResponse.json({});
    } catch (err) {
        //return NextResponse.json({error: "The turtles could not be moved."}, {status: 500});
        return NextResponse.json({}, {status: 500});
    }
}