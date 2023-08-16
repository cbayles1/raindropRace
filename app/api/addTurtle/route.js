import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST() {
    db.addTurtle();
    return NextResponse.json({});
}