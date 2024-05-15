import {getUserSession} from '../lib/session';

export default async function Leaderboard() {
    const userSession = await getUserSession();
    let leaderboard = [];

    const res = await fetch(`${process.env.DOMAIN_NAME}/api/getLeaderboard`, {cache: 'no-store'});
    if (res.status != 200) {
        leaderboard = [];
    } else {
        leaderboard = await res.json();
    }
  
    return (<div className='flex justify-center items-center'>
        <table className='mt-16 mx-8 text-oat text-center'>
            <thead className='bg-nero'>
                <tr>
                    <th className='leaderboardHeader'>Rank</th>
                    <th className='leaderboardHeader'>User</th>
                    <th className='leaderboardHeader'>Wins</th>
                </tr>
            </thead>
            <tbody>
                {leaderboard.map((user) => {
                    let cellClass = 'leaderboardCell';
                    if (user.id == userSession.id) {
                        cellClass = 'leaderboardCellSelf'
                    }
                    return (<tr key={user.id}>
                        <td className={cellClass}>{user.rank}</td>
                        <td className={cellClass}>{user.name}</td>
                        <td className={cellClass}>{user.wins}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    </div>);
    
}