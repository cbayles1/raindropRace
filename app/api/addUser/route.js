import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST(request) {
    const req = await request.json();
    const name = req['username'];
    try {
        const data = await db.addUser(name);
        return NextResponse.json(name);
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}