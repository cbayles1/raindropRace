import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST(request) {
    const {name} = await request.json();
    try {
        const data = await db.addTurtle(name);
        return NextResponse.json(data);
    } catch {
        return "The turtle could not be added.";
    }
}