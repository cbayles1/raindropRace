'use client';
import {useState, useLayoutEffect, useRef} from 'react';
import Image from 'next/image';

export default function TurtleLane({turtle}) {

  const turtleImg = <Image className='m-2' alt={turtle.name} src={`/turtles/${turtle.name.toLowerCase()}.png`} width={48} height={48}></Image>;

  const [laneWidth, setLaneWidth] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(() => {
    setLaneWidth(ref.current.clientWidth); //TODO: SUBTRACT FINISH LINE
  }, []);

  return (
  <span className="h-16 my-1 flex flex-cols-2 bg-terra">
    <span id="nametag" className="w-24 h-16 flex bg-alpine">
      <span id="name" className="px-0.5 py-0 text-oat m-auto font-mono text-sm -rotate-45">{turtle.name}</span>
    </span>
    <span ref={ref} id="lane" className="bg-asphalt ml-auto w-full grid">
      <Image className='grid place-self-end end-4 absolute' alt="checkered line" src={'./checkers.svg'} width={32} height={64}></Image>
      <div style={{transform: `translateX(${0.01 * turtle.position * laneWidth}px)`}}>{turtleImg}</div>
    </span>
  </span>
  );
}