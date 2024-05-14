'use server';
import {getUserSession} from '../lib/session';

export async function voteForTurtle(turtleId) {
    const user = await getUserSession();
    const res = await fetch(`${process.env.DOMAIN_NAME}/api/vote/`, {
        method: 'POST',
        body: JSON.stringify({'userId': user.id, 'turtleId': turtleId})
    });
}
