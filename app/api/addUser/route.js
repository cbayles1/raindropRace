import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST(request) {
    const {name} = await request.json();
    try {
        const data = await db.addUser(name);
        return NextResponse.json(data);
    } catch {
        return "The user could not be added.";
    }
}