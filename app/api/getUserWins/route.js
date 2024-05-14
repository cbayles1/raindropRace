import { NextResponse } from "next/server";
const db = require('../db.js');

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = Number(searchParams.get('userid'));
        const data = await db.getUserWins(userId);
        return NextResponse.json(data);
    } catch(err) {
        return NextResponse.json({}, {status: 500});
    }
}