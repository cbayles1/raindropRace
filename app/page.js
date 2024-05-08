import RaceBox from './(components)/RaceBox';
import VoteBox from './(components)/VoteBox';
import LoginBox from './(components)/LoginBox';
import WinnerBox from './(components)/WinnerBox';
import {cookies} from 'next/headers';

export default async function Page() {
  const turtles = await getTurtles(); // switching these around sadly prevents positions from updating bizarrely, and getting positions within moveTurtles didn't help
  await moveTurtles();

  const cookieStore = cookies();
  const userIdCookie = cookieStore.get('user_id');
  const winnerDisplayCookie = cookieStore.get('winnerDisplay');

  let lowerBox = <LoginBox></LoginBox>;
  if (turtles && userIdCookie && userIdCookie.value) {
    if (winnerDisplayCookie && winnerDisplayCookie.value) {
      lowerBox = <WinnerBox turtles={turtles}/>;
    } else {
      lowerBox = <VoteBox turtles={turtles}/>;
    }
  }

  return (
    <div id="wrapper" className='m-2 space-y-4 h-full'>
      <RaceBox turtles={turtles}/>
      {lowerBox}
      <div id="disclaimers" className='bottom-4 absolute ml-2'>
        <p id="">Once you have voted on a turtle, you cannot change your vote until the next race.</p>
        <p id="fifty">Once any turtle has crossed the 50 inch line, players cannot vote for the remainder of the race.</p>
        <p id="refresh">These turtles do not like to move while watched. Please refresh the page for them to move.</p>
      </div>
    </div>
  );
}

async function getTurtles() {
  const res = await fetch("http://localhost:3000/api/getAllTurtlesDataNoVel/", {cache: 'no-store'});
  return await res.json();
}

async function moveTurtles() {
  const res = await fetch("http://localhost:3000/api/moveAllTurtles/", {method: 'GET'});
  const data = await res.json();
  return data;
}