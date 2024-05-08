import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST(request) {
    const req = await request.json();
    db.deleteUser(req['id']);
    return NextResponse.json({});
}