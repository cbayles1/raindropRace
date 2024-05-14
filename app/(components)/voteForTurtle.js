'use server';
import {getUserSession} from '../lib/session';

export async function voteForTurtle(turtleId) {
    const user = await getUserSession();
    console.log(process.env.DOMAIN_NAME);
    const res = await fetch(`${process.env.DOMAIN_NAME}/api/vote/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            'userId': user.id, 
            'turtleId': turtleId
        })
    });
}
