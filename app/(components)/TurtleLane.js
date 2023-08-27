export default function TurtleLane({turtle}) {
    let winnerDisplay = "false";
    if (turtle.is_winner) {
      winnerDisplay = "true";
    }
  
    return (
    <div>
      <p>TurtleLane</p>
    </div>
    );
  }