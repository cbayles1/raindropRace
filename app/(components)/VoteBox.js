import VoteOptions from './VoteOptions';
import {cookies} from 'next/headers';

export default async function VoteBox({turtles}) {
  const cookieStore = cookies();
  const userIdCookie = cookieStore.get('user_id');

  let turtlePicked = null;
  let userWins = 0;
  let rank = 0;
  let leaderboard = [];
  if (userIdCookie && userIdCookie.value) {
    try {
      const res = await fetch(`http://localhost:3000/api/getTurtleIdFromUser?userid=${userIdCookie.value}`, {cache: 'no-store'});
      const data = await res.json();
      turtlePicked = data;
    } catch (err) {
      turtlePicked = null;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/getUserWins?userid=${userIdCookie.value}`, {cache: 'no-store'});
      const data = await res.json();
      userWins = data;
    } catch (err) {
      userWins = 0;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/getLeaderboard`, {cache: 'no-store'});
      leaderboard = await res.json();
      let x = 0; // different from i in case of ties
      for (let i = 0; i < leaderboard.length; i++) {
        if (i > 0 && leaderboard[i].wins == leaderboard[i - 1].wins) {
          x--;
        }
        if (leaderboard[i].id == userIdCookie.value) {
          rank = x + 1;
          break;
        }
        x++;
      };
    } catch (err) {
      leaderboard = [];
      rank = 0;
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
    <div id="disclaimers" className='bottom-4 absolute ml-2'>
      <p id="refresh">These turtles do not like you watching them move. Please refresh the page so they keep going.</p>
      <p id="noTakebacks">Once you have voted on a turtle, you cannot change your vote until the next race.</p>
      <p id="fifty">Once any turtle has made it halfway, you cannot vote for the remainder of the race.</p>
    </div>
    </>
  );
}