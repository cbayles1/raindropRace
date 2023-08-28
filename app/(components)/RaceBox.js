import TurtleLane from './TurtleLane';

export default function RaceBox({turtles}) {

  turtles.sort((a,b) => {
    return a.id - b.id;
  });

  return (
  <div id="raceBox" className="w-1px"> {/* don't know why setting the width to a set number makes everything work, but it does*/}
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