import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST(request) {
    const {name} = await request.json();
    db.addTurtle(name);
    return NextResponse.json({});
}