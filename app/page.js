//import Image from 'next/image'
//import styles from './page.module.css'

async function getTurtles() {
  const res = await fetch("http://localhost:3000/api/getAllTurtlesDataNoVel/");
  return await res.json();
}

function Turtle({turtleData}) {
  let winnerDisplay = "false";
  if (turtleData.is_winner) {
    winnerDisplay = "true";
  }

  return (
  <div>
    <h3>{turtleData.name}</h3>
    <ul>
      <li>Votes: {turtleData.votes}</li>
      <li>Position: {turtleData.position}</li>
      <li>Is the Winner: {winnerDisplay}</li>
    </ul>
  </div>);
}

export default async function Home() {
  const turtles = await getTurtles();
  return (
    <main>
      <div>
      {
        turtles.map((turtle) => {
          return <Turtle turtleData={turtle}></Turtle>;
        })
      }
      </div>
    </main>
  )
}