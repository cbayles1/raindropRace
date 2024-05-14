'use server';
import {getUserSession} from '../lib/session';
import axios from 'axios';

export async function voteForTurtle(turtleId) {
    const user = await getUserSession();
    const res = await axios.post(`${process.env.DOMAIN_NAME}/api/vote/`, {
        'userId': user.id, 
        'turtleId': turtleId
    });
}
