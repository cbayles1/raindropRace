'use client';
import { useEffect, useState } from "react";
import { voteForTurtle } from "./voteForTurtle";

export default function VoteOptions({turtles, initialChoice}) {
    const [currentChoice, setCurrentChoice] = useState(initialChoice);
    return(
        <div id="voteOptions" className='grid grid-flow-col gap-4 mr-4'>
        {
            turtles.map((turtle) => {
                return <VoteOption turtle={turtle} key={turtle.id}></VoteOption>;
            })
        }
        </div>
    );

    function VoteOption({turtle}) {
        const [bgColor, setBgColor] = useState("alpine");

        useEffect(() => {
            if (currentChoice == turtle.id) {
                setBgColor("midnight");
            } else {
                setBgColor("alpine");
            }
        }, [currentChoice]);

        return (<button value={turtle.id.toString()} onClick={handleButtonClick} 
          className={`grid grid-cols-1 py-4 bg-${bgColor} w-full h-full place-items-center space-y-4 min-w-16 hover:bg-midnight`}>
            <div id="turtle" className="aspect-square h-12 md:h-18 mx-4 bg-oat"></div>
            <label htmlFor="turtle" className="text-oat font-mono">{turtle.name}</label>
        </button>);

        async function handleButtonClick(event) {
            const turtleIdStr = event.currentTarget.value;
            try {
                const turtleId = Number(turtleIdStr);
                setCurrentChoice(turtleId);
                await voteForTurtle(turtleId);
            } catch (err) {
                throw "Something went wrong handling a vote button click.";
            }
        }
    }
}