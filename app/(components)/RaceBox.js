import TurtleLane from './TurtleLane';

export default function RaceBox({turtles}) {
  return (
  <div className='w-full'>
    <div id="positionRuler">positionRuler</div>

    <div id="turtleLanes" className='grid grid-rows-5 bg-oat px-2 py-1'>
    {
      turtles.map((turtle) => {
        return <TurtleLane turtle={turtle} key={turtle.id}></TurtleLane>;
      })
    }
    </div>
  </div>
  )
}