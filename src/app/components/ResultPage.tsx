import { Link, useParams } from 'react-router';
import { Card } from './Card';
import { Button } from './Button';
import { Navbar } from './Navbar';
import { Trophy, Target, Clock, CheckCircle2, TrendingUp, Award, Share2 } from 'lucide-react';

export function ResultPage() {
  const { testId } = useParams();

  const result = {
    score: 72,
    total: 100,
    rank: 45,
    totalAttempts: 320,
    percentile: 92.5,
    accuracy: 85.7,
    timeTaken: 54,
    totalTime: 60,
    correct: 72,
    incorrect: 16,
    unattempted: 12
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl p-6 md:p-12 text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg mb-4 md:mb-6">
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-6xl mb-2 md:mb-3">{result.score}<span className="text-2xl md:text-3xl text-muted-foreground">/{result.total}</span></h1>
          <p className="text-lg md:text-xl text-primary mb-2">Excellent Performance! 🎉</p>
          <p className="text-sm md:text-base text-muted-foreground">You scored better than {result.percentile}% of test takers</p>
          <div className="flex justify-center gap-3 mt-6">
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Result
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card className="text-center bg-white border-2 border-blue-200">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <p className="text-2xl md:text-3xl mb-1 text-primary">{result.rank}</p>
            <p className="text-xs text-muted-foreground">Your Rank</p>
            <p className="text-xs text-muted-foreground">out of {result.totalAttempts}</p>
          </Card>

          <Card className="text-center bg-white border-2 border-orange-200">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
            </div>
            <p className="text-2xl md:text-3xl mb-1 text-secondary">{result.percentile}%</p>
            <p className="text-xs text-muted-foreground">Percentile</p>
          </Card>

          <Card className="text-center bg-white border-2 border-green-200">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
            <p className="text-2xl md:text-3xl mb-1 text-green-600">{result.accuracy}%</p>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </Card>

          <Card className="text-center bg-white border-2 border-purple-200">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            </div>
            <p className="text-2xl md:text-3xl mb-1 text-purple-600">{result.timeTaken}</p>
            <p className="text-xs text-muted-foreground">Minutes Taken</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="bg-white">
            <h2 className="text-xl mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Question Analysis
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm">Correct Answers</span>
                </div>
                <span className="text-2xl text-primary">{result.correct}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Incorrect Answers</span>
                </div>
                <span className="text-2xl text-red-600">{result.incorrect}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm">Unattempted</span>
                </div>
                <span className="text-2xl text-gray-600">{result.unattempted}</span>
              </div>
            </div>
          </Card>

          <Card className="bg-white">
            <h2 className="text-xl mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Performance Comparison
            </h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary">Your Score</span>
                  <span className="text-primary">{result.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500" style={{ width: `${result.score}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Average Score</span>
                  <span>58%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Top Score</span>
                  <span>96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-4 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center">
          <Link to={`/solutions/${testId}`} className="w-full sm:w-auto">
            <Button size="md" variant="primary" className="w-full sm:w-auto">View Solutions</Button>
          </Link>
          <Link to={`/leaderboard/${testId}`} className="w-full sm:w-auto">
            <Button size="md" variant="secondary" className="w-full sm:w-auto">View Leaderboard</Button>
          </Link>
          <Link to="/category/ssc" className="w-full sm:w-auto">
            <Button size="md" variant="outline" className="w-full sm:w-auto">Practice More Tests</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
