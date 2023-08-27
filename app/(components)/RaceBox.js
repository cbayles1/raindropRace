import TurtleLane from './TurtleLane';
import styles from '../globals.scss';

export default function RaceBox({turtles}) {
  return (
  <div>
    <div id="positionRuler">
      <div className={styles.fred}>positionRuler</div>
    </div>

    <div id="turtleLanes">
    {
      turtles.map((turtle) => {
        return <TurtleLane turtle={turtle} key={turtle.id}></TurtleLane>;
      })
    }
    </div>
  </div>
  )
}