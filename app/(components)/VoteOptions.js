'use client';
import { useEffect, useState } from "react";
import { voteForTurtle } from "./voteForTurtle";
import Image from 'next/image';

export default function VoteOptions({turtles, turtlePicked}) {
    const [userVote, setUserVote] = useState(turtlePicked);
    const [hoverColor, setHoverColor] = useState('nero');

    return (
        <div id="voteOptions" className='grid grid-flow-col gap-4 mr-4 mt-4'>
        {
            turtles.map((turtle) => {
                return <VoteOption turtle={turtle} key={turtle.id}></VoteOption>;
            })
        }
        </div>
    );

    function VoteOption({turtle}) {
        const [bgColor, setBgColor] = useState("alpine");

        const turtleImg = <Image className='mx-4' alt={turtle.name} src={`/turtles/${turtle.name.toLowerCase()}.png`} width={96} height={96}></Image>;

        function checkButtonColors(userVote) {
            if (userVote) {
                setHoverColor("alpine");
                if (turtle.id == userVote) {
                    setBgColor("nero");
                } else {
                    setBgColor("alpine");
                }
            } else {
                setHoverColor("nero");
                if (userVote == turtle.id) {
                    setBgColor("nero");
                } else {
                    setBgColor("alpine");
                }
            }
        }

        if (turtle.position >= 50 && !userVote) { // if any turtle is past 50 and user hasn't voted, user cannot vote on any turtle
            setUserVote(-1);
        }

        useEffect(() => {
            checkButtonColors(userVote);
        }, [userVote]);
        useEffect(() => {
            checkButtonColors(userVote);
        }, []);

        return (<button value={turtle.id.toString()} onClick={handleButtonClick} 
          className={`grid grid-cols-1 py-3 rounded-md bg-${bgColor} w-full h-full place-items-center space-y-4 min-w-16 hover:bg-${hoverColor}`}>
            {turtleImg}
            <label htmlFor="turtle" className="text-oat font-mono">{turtle.name}</label>
        </button>);

        async function handleButtonClick(event) {
            if (userVote) { // if a turtle was already picked, don't allow any more votes
                setHoverColor("alpine");
                return;
            }
            const turtleIdStr = event.currentTarget.value;
            try {
                const turtleId = Number(turtleIdStr);
                setUserVote(turtleId);
                await voteForTurtle(turtleId);
            } catch (err) {
                throw "Something went wrong handling a vote button click.";
            }
        }
    }
}