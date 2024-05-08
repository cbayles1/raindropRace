import VoteOption from './VoteOption';

export default function VoteBox({turtles}) {
  return (
    <div className='w-full'>
      <h3>Vote</h3>
      {
        turtles.map((turtle) => {
          return <VoteOption data={turtle} key={turtle.id}></VoteOption>;
        })
      }
    </div>
  );
}