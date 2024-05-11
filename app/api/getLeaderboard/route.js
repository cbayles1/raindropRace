import { NextResponse } from "next/server";
const db = require('../db.js');

export async function GET(request) {
    try {
        const data = await db.getLeaderboard();
        return NextResponse.json(data);
    } catch(err) {
        return NextResponse.json({}, {status: 500});
    }
}