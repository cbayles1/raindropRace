'use server';
import {getUserSession} from '../lib/session';

export async function voteForTurtle(turtleId) {
    const user = await getUserSession();
    console.log(user.id);
    console.log(turtleId);
    const res = await fetch(`${process.env.MY_DOMAIN_NAME}/api/vote/`, {
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
