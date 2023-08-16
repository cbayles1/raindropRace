import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST(request) {
    const {userId} = await request.json();
    db.deleteUser(userId);
    return NextResponse.json({});
}