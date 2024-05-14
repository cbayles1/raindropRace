import VoteOptions from './VoteOptions';
import {getUserSession} from '../lib/session';

export default async function VoteBox({turtles}) {
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
    <div className='w-full h-full mx-2 space-y-2 text-oat'>
      <div className='flex justify-evenly items-center font-mono text-2xl p-3 text-center bg-nero mr-4'>
        <div>Rank: #{rank}</div>
        <div>Wins: {userWins}</div>
      </div>
      <VoteOptions turtles={turtles} turtlePicked={turtlePicked}></VoteOptions>
    </div>
    <div id="disclaimers" className='bottom-2 absolute ml-2 text-sm'>
      <p id="refresh">These turtles do not like you watching them move. Please refresh the page so they keep going.</p>
      <p id="noTakebacks">Once you have voted on a turtle, you cannot change your vote until the next race.</p>
      <p id="fifty">Once any turtle has made it halfway, you cannot vote for the remainder of the race.</p>
    </div>
    </>
  );
}