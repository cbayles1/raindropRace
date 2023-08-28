import RaceBox from './(components)/RaceBox';
import VoteBox from './(components)/VoteBox';
import Script from 'next/script';

export default async function Page() {
  const turtles = await getTurtles();
  await moveTurtles();

  return (
    <div id="wrapper" className='m-2'>
      <RaceBox turtles={turtles}/>
      <VoteBox turtles={turtles}/>
    </div>
  );
}

async function getTurtles() {
  const res = await fetch("http://localhost:3000/api/getAllTurtlesDataNoVel/", {cache: 'no-store'});
  return await res.json();
}

async function moveTurtles() {
  const res = await fetch("http://localhost:3000/api/moveAllTurtles/", {
    method: 'POST'
  });
}