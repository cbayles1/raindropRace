export default function TurtleLane({turtle}) {
    let winnerDisplay = "false";
    if (turtle.is_winner) {
      winnerDisplay = "true";
    }
  
    return (
    <span className="h-16 my-1 flex flex-cols-2 bg-terra">
      <span id="nametag" className="w-24 h-16 flex bg-alpine">
        <span id="name" className="px-0.5 py-0 text-oat m-auto font-mono text-sm -rotate-45">{turtle.name}</span>
      </span>
      <span id="lane" className="bg-midnight ml-auto w-full">
          <div id="turtle" className={`aspect-square h-12 m-2 bg-oat translate-x-${turtle.position}`}></div>
      </span>
    </span>
    );
  }