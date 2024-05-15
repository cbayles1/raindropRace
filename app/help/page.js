export default async function Help() {
    return (<div className='mt-16 mx-8 flex flex-col text-oat text-center text-sm md:text-md lg:text-lg space-y-2'>
        <p id="refresh">These turtles do not like you watching them move. When users refresh the page, they keep going.</p>
        <p id="noTakebacks">Once you have voted on a turtle, you cannot change your vote until the next race.</p>
        <p id="fifty">Once any turtle has made it halfway, you cannot vote for the remainder of the race.</p>
    </div>);
}