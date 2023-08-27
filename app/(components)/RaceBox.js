import TurtleLane from './TurtleLane';

export default function RaceBox({turtles}) {
  return (
  <div>
    <div id="positionRuler">
      <div className='text-xs'>positionRuler</div>
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