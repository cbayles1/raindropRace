export default function LoginBox({showDesc=true}) {
    let desc = <></>;
    if (showDesc) {
        desc = <p id="desc">Welcome! Once logged in, you are free to place your bets on which turtle will win the race!</p>
    }
    return (
        <div className='flex flex-col justify-self-center text-oat text-center text-sm md:text-md lg:text-lg space-y-2'>
            {desc}
            <p id="noTakebacks">Careful! Once you have voted on a turtle, you cannot change your vote until next race.</p>
            <p id="fifty">And once any turtle has made it 50 inches, you cannot vote for the remainder of the race.</p>
            <p id="refresh">These turtles don't like being watched while they move. When users refresh the page, the turtles keep going.</p>
            <p id="login">Apologies about the login page; it's safe I promise! I just can't make the warning disappear.</p>
            <p id="login2">I also can't figure out how to remove the second login button yet. Working on it.</p>
        </div>
    );
}