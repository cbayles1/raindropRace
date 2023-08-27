import styles from '../globals.scss';

export default function TurtleLane({turtle}) {
    let winnerDisplay = "false";
    if (turtle.is_winner) {
      winnerDisplay = "true";
    }
  
    return (
    <div>
      <p className={styles.fred}>TurtleLane</p>
    </div>
    );
  }