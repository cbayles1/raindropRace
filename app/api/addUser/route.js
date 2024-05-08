import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST(request) {
    const req = await request.json();
    const name = req['username'];
    try {
        const userId = await db.addUser(name);
        return NextResponse.json({'user_id': userId});
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}