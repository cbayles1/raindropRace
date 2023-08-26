'use client'
import {Container} from 'react-bootstrap';
import VoteOption from './VoteOption';

export default function VoteBox({turtles}) {
    return (
    <div id="wrapper">
      <Container>
        <h2>Vote Block</h2>
        {
          turtles.map((turtle) => {
            return <VoteOption data={turtle} key={turtle.id}></VoteOption>;
          })
        }
      </Container>
      <p id="disclaimer">Nisi sit amet eiusmod dolor nulla tempor occaecat.</p>
    </div>
    );
  }