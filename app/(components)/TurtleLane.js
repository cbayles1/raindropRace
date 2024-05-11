'use client';
import {useState, useLayoutEffect, useRef} from 'react';
import Image from 'next/image';

export default function TurtleLane({turtle}) {

  const checkers = <Image className='grid place-self-end end-4 absolute' src={'./checkers.svg'} width={32} height={64}></Image>;
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
    <span ref={ref} id="lane" className="bg-midnight ml-auto w-full grid">
      {checkers}
      <div id="turtle" className="aspect-square h-12 m-2 bg-oat" style={{transform: `translateX(${0.01 * turtle.position * laneWidth}px)`}}></div>
    </span>
  </span>
  );
}