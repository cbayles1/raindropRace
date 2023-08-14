import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST() {
    db.addRaindrop();
    return NextResponse.json({});
}