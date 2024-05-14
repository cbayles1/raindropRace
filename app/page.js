import RaceBox from './(components)/RaceBox';
import LowerBox from './(components)/LowerBox';
import LoginBox from './(components)/LoginBox';
import {getUserSession} from './lib/session';

export default async function Page() {
  await moveTurtles();
  const turtles = await getTurtles();
  let user;

  try {
    user = await getUserSession();
  } catch (err) {
    user = null;
  };

  let lowerBox = <LoginBox></LoginBox>;
  if (turtles && user) {
    lowerBox = <LowerBox turtles={turtles}/>;
  }

  return (
    <div id="wrapper" className='m-2 space-y-4 h-full overflow-hidden'>
      <RaceBox turtles={turtles}/>
      {lowerBox}
    </div>
  );
}

async function getTurtles() {
  const res = await fetch(`${process.env.DOMAIN_NAME}/api/getAllTurtlesDataNoVel/`, {cache: 'no-store'});
  return await res.json();
}

async function moveTurtles() {
  const res = await fetch(`${process.env.DOMAIN_NAME}/api/moveAllTurtles/`, {cache: 'no-store'});
}