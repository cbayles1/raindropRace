import VoteOptions from './VoteOptions';
import {getUserSession} from '../lib/session';
import Link from 'next/link';

export default async function LowerBox({turtles}) {
  const user = await getUserSession();

  let turtlePicked = null;
  let userWins = 0;
  let rank = 0;
  let leaderboard = [];
  let x;
  if (user) {
    try {
      const res = await fetch(`${process.env.DOMAIN_NAME}/api/getTurtleIdFromUser?userid=${user.id}`, {cache: 'no-store'});
      if (res.status != 200) {
        turtlePicked = null;
      } else {
        const data = await res.json();
        turtlePicked = data;
      }
    } catch (err) {
      turtlePicked = null;
    }

    try {
      const res = await fetch(`${process.env.DOMAIN_NAME}/api/getUserWins?userid=${user.id}`, {cache: 'no-store'});
      if (res.status != 200) {
        userWins = 0;
      } else {
        const data = await res.json();
        userWins = data;
      }
    } catch (err) {
      userWins = 0;
    }

    try {
      const res = await fetch(`${process.env.DOMAIN_NAME}/api/getLeaderboard`, {cache: 'no-store'});
      if (res.status != 200) {
        leaderboard = [];
        rank = -1;
      } else {
        leaderboard = await res.json();
        x = 0; // different from i in case of ties
      }
      for (let i = 0; i < leaderboard.length; i++) {
        if (i > 0 && leaderboard[i].wins == leaderboard[i - 1].wins) {
          x--;
        }
        if (leaderboard[i].id == user.id) {
          rank = x + 1;
          break;
        }
        x++;
      };
    } catch (err) {
      leaderboard = [];
      rank = -1;
    }

  }

  return (<>
    <div className='w-full h-full mx-2 space-y-6 text-oat'>
      <div className='flex justify-around items-center font-mono text-md md:text-2xl p-3 text-justify bg-nero mr-4'>
        <Link href="/help" className="p-3 rounded-md bg-alpine h-full place-items-center min-w-16 hover:bg-asphalt">Help</Link>
        <div>#{rank} of {leaderboard.length} ({userWins} wins)</div>
        <Link href="/leaderboard" className="p-3 rounded-md bg-alpine h-full place-items-center min-w-16 hover:bg-asphalt">Leaderboard</Link>
      </div>
      <VoteOptions turtles={turtles} turtlePicked={turtlePicked}></VoteOptions>
    </div>
    
    </>
  );
}