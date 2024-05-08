'use server';
import {cookies} from 'next/headers';

export async function voteForTurtle(turtleId) {
    const cookieStore = cookies();
    const userIdCookie = cookieStore.get('user_id');
    const res = await fetch("http://localhost:3000/api/vote/", {
        method: 'POST',
        body: JSON.stringify({'userId': userIdCookie.value, 'turtleId': turtleId})
    });
}
