import RaceBox from './(components)/RaceBox';
import VoteBox from './(components)/VoteBox';
import LoginBox from './(components)/LoginBox';
import WinnerBox from './(components)/WinnerBox';
import {cookies} from 'next/headers';

export default async function Page() {
  await moveTurtles();
  const turtles = await getTurtles(); // switching these around sadly prevents positions from updating bizarrely, and getting positions within moveTurtles didn't help

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
    </div>
  );
}

async function getTurtles() {
  const res = await fetch("http://localhost:3000/api/getAllTurtlesDataNoVel/", {cache: 'no-store'});
  return await res.json();
}

async function moveTurtles() {
  const res = await fetch("http://localhost:3000/api/moveAllTurtles/", {cache: 'no-store'});
}