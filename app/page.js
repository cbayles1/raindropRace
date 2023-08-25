//import Image from 'next/image'
//import styles from './page.module.css'

export default async function Page() {
  const turtles = await getTurtles();
  return (
    <div id="wrapper">
      <Race turtles={turtles}/>
      <Vote turtles={turtles}/>
    </div>
  );
}

async function getTurtles() {
  const res = await fetch("http://localhost:3000/api/getAllTurtlesDataNoVel/");
  return await res.json();
}

function TurtleLane({turtle}) {
  let winnerDisplay = "false";
  if (turtle.is_winner) {
    winnerDisplay = "true";
  }

  return (
  <div>
    
  </div>);
}

function VoteOption({turtle}) {}

function Race({turtles}) {
  return (
  <div id="wrapper">
    <div id="positionRuler">
    </div>

    <div id="turtleLanes">
    {
      turtles.map((turtle) => {
        return <TurtleLane turtle={turtle}></TurtleLane>;
      })
    }
    </div>
  </div>
  )
}

function Vote({turtles}) {
  return (
  <div id="wrapper">
    <div>
      <h2>Vote</h2>
      {
        turtles.map((turtle) => {
          return <VoteOption data={turtle}></VoteOption>;
        })
      }
    </div>
    <p id="disclaimer">Dolore sit labore voluptatem est natus adipisci rerum. Eligendi ut autem et ea aut et rerum sunt.</p>
  </div>
  );
}