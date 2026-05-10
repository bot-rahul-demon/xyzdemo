import { useParams } from 'react-router';
import { Navbar } from './Navbar';
import { Card } from './Card';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

export function LeaderboardPage() {
  const { testId } = useParams();

  const leaderboard = Array.from({ length: 50 }, (_, i) => ({
    rank: i + 1,
    name: i === 44 ? 'You' : `Student ${Math.floor(Math.random() * 10000)}`,
    score: Math.max(50, 100 - i * 2 + Math.floor(Math.random() * 5)),
    percentile: Math.max(50, 100 - i * 1.5).toFixed(1),
    avatar: `https://ui-avatars.com/api/?name=User${i}&background=random`,
    isCurrentUser: i === 44
  }));

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-orange-500" />;
    return null;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-8 md:py-12 mb-6 md:mb-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 md:w-7 md:h-7 text-secondary" />
            </div>
            <h1 className="text-2xl md:text-4xl">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-lg">See how you rank against other test takers</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-8 md:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {leaderboard.slice(0, 3).map((entry, idx) => (
            <Card key={entry.rank} className={`text-center bg-white border-2 ${idx === 0 ? 'border-yellow-300 sm:order-1' : idx === 1 ? 'border-gray-300 sm:order-2' : 'border-orange-300 sm:order-3'}`}>
              <div className="flex flex-col items-center p-2 md:p-4">
                <div className="mb-2 md:mb-3">
                  {getRankIcon(entry.rank)}
                </div>
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${getRankBadgeColor(entry.rank)} flex items-center justify-center text-lg md:text-2xl mb-2 md:mb-3 shadow-lg`}>
                  #{entry.rank}
                </div>
                <h3 className="text-base md:text-xl mb-2">{entry.name}</h3>
                <p className="text-2xl md:text-3xl mb-1 text-primary">{entry.score}/100</p>
                <p className="text-xs md:text-sm text-muted-foreground">{entry.percentile}% Percentile</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-muted-foreground">Rank</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-muted-foreground">Student</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-muted-foreground">Score</th>
                  <th className="text-left py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-muted-foreground">Percentile</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.rank}
                    className={`border-b border-border last:border-0 transition-colors ${
                      entry.isCurrentUser ? 'bg-blue-50 border-l-4 border-l-secondary' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="py-3 md:py-4 px-2 md:px-4">
                      <div className={`inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-base ${getRankBadgeColor(entry.rank)}`}>
                        {entry.rank}
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-200 to-orange-200 rounded-full flex items-center justify-center text-xs md:text-sm flex-shrink-0">
                          {entry.name.charAt(0)}
                        </div>
                        <span className="text-xs md:text-base truncate">
                          {entry.name}
                          {entry.isCurrentUser && (
                            <span className="ml-2 text-xs bg-secondary text-white px-2 py-1 rounded-full">
                              You
                            </span>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-base">
                      <span className="text-primary">{entry.score}</span>/100
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-base">{entry.percentile}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
