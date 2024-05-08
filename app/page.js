import RaceBox from './(components)/RaceBox';
import VoteBox from './(components)/VoteBox';
import LoginBox from './(components)/LoginBox';
import WinnerBox from './(components)/WinnerBox';
import {cookies} from 'next/headers';

export default async function Page() {
  const turtles = await getTurtles();
  await moveTurtles();

  const cookieStore = cookies();
  const usernameCookie = cookieStore.get('username');
  const winnerDisplayCookie = cookieStore.get('winnerDisplay');

  let lowerBox = <LoginBox></LoginBox>;
  if (turtles && usernameCookie && usernameCookie.value.length > 0) {
    if (winnerDisplayCookie && winnerDisplayCookie.value) {
      lowerBox = <WinnerBox turtles={turtles}/>;
    } else {
      lowerBox = <VoteBox turtles={turtles}/>;
    }
  }

  return (
    <div id="wrapper" className='m-2 space-y-4'>
      <RaceBox turtles={turtles}/>
      {lowerBox}
      <p id="disclaimer">These turtles do not like to move while watched. Please refresh the page for them to move.</p>
    </div>
  );
}

async function getTurtles() {
  const res = await fetch("http://localhost:3000/api/getAllTurtlesDataNoVel/", {cache: 'no-store'});
  return await res.json();
}

async function moveTurtles() {
  const res = await fetch("http://localhost:3000/api/moveAllTurtles/", {method: 'POST'});
}