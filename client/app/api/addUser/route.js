import { NextResponse } from "next/server";
const db = require('../db.js');

export async function GET(request) {
    return NextResponse('HELLO!');
}

export async function POST(request) {
    const {displayName} = await request.json();
    db.addUser(displayName);
    return NextResponse.json({userId: displayName});
}