import VoteOptions from './VoteOptions';
import {cookies} from 'next/headers';

export default async function VoteBox({turtles}) {
  const cookieStore = cookies();
  const userIdCookie = cookieStore.get('user_id');

  let initialChoice = null;
  if (userIdCookie && userIdCookie.value) {
    try {
      const res = await fetch(`http://localhost:3000/api/getTurtleIdFromUser?userid=${userIdCookie.value}`);
      const data = await res.json();
      initialChoice = data;
    } catch (err) {
      initialChoice = null;
    }
  }

  return (
    <div className='w-full h-full mx-2 space-y-2 text-oat'>
      <h3 className='font-mono text-3xl p-4 text-center bg-nero mr-4'>Vote</h3>
      <VoteOptions turtles={turtles} initialChoice={initialChoice}></VoteOptions>
    </div>
  );
}