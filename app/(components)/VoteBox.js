import VoteOptions from './VoteOptions';
import {cookies} from 'next/headers';

export default async function VoteBox({turtles}) {
  const cookieStore = cookies();
  const userIdCookie = cookieStore.get('user_id');

  let turtlePicked = null;
  let userWins = 0;
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
  }

  return (<>
    <div className='w-full h-full mx-2 space-y-2 text-oat'>
      <h3 className='font-mono text-2xl p-3 text-center bg-nero mr-3'>Vote Below</h3>
      <p>Your Wins: {userWins}</p>
      <VoteOptions turtles={turtles} turtlePicked={turtlePicked}></VoteOptions>
    </div>
    <div id="disclaimers" className='bottom-4 absolute ml-2'>
      <p id="refresh">These turtles do not like you watching them move. Please refresh the page so they keep going.</p>
      <p id="noTakebacks">Once you have voted on a turtle, you cannot change your vote until the next race.</p>
      <p id="fifty">Once any turtle has crossed the 50 inch line, you cannot vote for the remainder of the race.</p>
    </div>
    </>
  );
}