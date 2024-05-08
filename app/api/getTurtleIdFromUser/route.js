import { NextResponse } from "next/server";
const db = require('../db.js');

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = Number(searchParams.get('userid'));
        const data = await db.getTurtleIdFromUser(userId);
        return NextResponse.json(data);
    } catch(err) {
//        return NextResponse.json({error: "There was trouble getting the user's turtle id."}, {status: 500});
        return NextResponse.json({}, {status: 500});
    }
}