import { Leaderboard as LeaderboardType } from '@/app/interfaces/leaderboard';

interface Props {
  leaderboard: LeaderboardType[];
}

export default function Leaderboard({ leaderboard }: Props) {
  return (
    <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Leaderboard</h2>
      <ul className="list-decimal list-inside">
        {leaderboard.map((entry, index) => (
          <li key={index} className="mt-1">
            {`${entry.name}: ${entry.score}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
