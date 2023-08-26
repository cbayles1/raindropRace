'use client'
import {Container} from 'react-bootstrap';
import TurtleLane from './TurtleLane';

export default function RaceBox({turtles}) {
  return (
  <div>
    <Container id="positionRuler">
      <p>positionRuler</p>
    </Container>

    <Container id="turtleLanes">
    {
      turtles.map((turtle) => {
        return <TurtleLane turtle={turtle} key={turtle.id}></TurtleLane>;
      })
    }
    </Container>
  </div>
  )
}