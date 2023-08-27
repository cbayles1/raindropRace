import VoteOption from './VoteOption';

export default function VoteBox({turtles}) {
    return (
    <div id="wrapper">
      <div>
        <h3>Vote</h3>
        {
          turtles.map((turtle) => {
            return <VoteOption data={turtle} key={turtle.id}></VoteOption>;
          })
        }
      </div>
      <p id="disclaimer">Nisi sit amet eiusmod dolor nulla tempor occaecat.</p>
    </div>
    );
  }