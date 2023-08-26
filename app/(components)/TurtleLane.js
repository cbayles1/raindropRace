'use client'
import {Container} from 'react-bootstrap';

export default function TurtleLane({turtle}) {
    let winnerDisplay = "false";
    if (turtle.is_winner) {
      winnerDisplay = "true";
    }
  
    return (
    <Container>
      <p>TurtleLane</p>
    </Container>
    );
  }