import VoteOption from './VoteOption';
import {cookies} from 'next/headers';

export default function VoteBox({turtles}) {
  const cookieStore = cookies();
  const usernameCookie = cookieStore.get('username');

  return (
    <div className='w-full'>
      <h4>Hello, {usernameCookie.value}!</h4>
      <h3>Vote</h3>
      {
        turtles.map((turtle) => {
          return <VoteOption data={turtle} key={turtle.id}></VoteOption>;
        })
      }
    </div>
  );
}