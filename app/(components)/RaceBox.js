import TurtleLane from './TurtleLane';

export default function RaceBox({turtles}) {

  turtles.sort((a,b) => {
    return a.id - b.id;
  });

  
  const markers = [];
  for (let i = 0; i < 11; i++) {
    markers.push(i * 10);
  }

  return (
  <div id="raceBox" className="w-1px"> {/* don't know why setting the width to a set number makes everything work, but it does*/}
    <div id="positionRuler" className='grid grid-cols-11 justify-items-start ml-32 mb-1'>
      {markers.map((marker) => {
        return <p className="text-oat" key={marker}>{marker}</p>
      })}
    </div>

    <div id="turtleLanes" className='grid grid-rows-5 bg-terra px-2 py-1'>
    {
      turtles.map((turtle) => {
        return <TurtleLane turtle={turtle} key={turtle.id}></TurtleLane>;
      })
    }
    </div>
  </div>
  )
}