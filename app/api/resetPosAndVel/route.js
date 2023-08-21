import { NextResponse } from "next/server";
const db = require('../db.js');

export async function POST() {
        try {
                await db.resetPosAndVel();
        } catch {
                throw "NO U"
        }
        return NextResponse.json({});
}