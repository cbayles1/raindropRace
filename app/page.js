//import Image from 'next/image';
import RaceBox from './(components)/RaceBox';
import VoteBox from './(components)/VoteBox';
import styles from './globals.scss';

export default async function Page() {
  const turtles = await getTurtles();
  return (
    <div id="wrapper">
      <RaceBox turtles={turtles}/>
      <VoteBox turtles={turtles}/>
    </div>
  );
}

async function getTurtles() {
  const res = await fetch("http://localhost:3000/api/getAllTurtlesDataNoVel/");
  return await res.json();
}