import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { Card } from './Card';
import { Button } from './Button';
import { Navbar } from './Navbar';
import { ChevronRight, BookOpen, Clock, Users, Target, TrendingUp } from 'lucide-react';

export function CategoryPage() {
  const { category } = useParams();
  const [filter, setFilter] = useState('all');

  const subcategories = {
    ssc: ['SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC CPO'],
    banking: ['IBPS PO', 'IBPS Clerk', 'SBI PO', 'SBI Clerk', 'RBI Grade B'],
    railways: ['RRB NTPC', 'RRB Group D', 'RRB JE', 'RRB ALP'],
    regulatory: ['SEBI Grade A', 'RBI Grade B', 'NABARD', 'IRDA']
  };

  const tests = [
    { id: 1, name: 'SSC CGL Tier 1 Full Mock Test', difficulty: 'medium', questions: 100, duration: 60, attempts: 12453, free: true, difficultyColor: 'text-orange-600', lang: 'English & Hindi' },
    { id: 2, name: 'SSC CGL Quantitative Aptitude', difficulty: 'hard', questions: 50, duration: 30, attempts: 8765, free: true, difficultyColor: 'text-red-600', lang: 'English' },
    { id: 3, name: 'SSC CGL General Awareness', difficulty: 'easy', questions: 50, duration: 30, attempts: 10234, free: false, difficultyColor: 'text-green-600', lang: 'English & Hindi' },
    { id: 4, name: 'SSC CGL English Language', difficulty: 'medium', questions: 50, duration: 30, attempts: 9876, free: true, difficultyColor: 'text-orange-600', lang: 'English' },
    { id: 5, name: 'SSC CGL Reasoning', difficulty: 'medium', questions: 50, duration: 30, attempts: 11234, free: true, difficultyColor: 'text-orange-600', lang: 'English & Hindi' },
    { id: 6, name: 'SSC CGL Previous Year Paper 2025', difficulty: 'hard', questions: 100, duration: 60, attempts: 15678, free: false, difficultyColor: 'text-red-600', lang: 'English & Hindi' }
  ];

  const filteredTests = filter === 'all' ? tests : tests.filter(t => t.free === (filter === 'free'));

  const categoryName = category?.toUpperCase() || 'CATEGORY';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="bg-gradient-to-r from-blue-50 via-white to-orange-50 py-6 md:py-8 mb-6 md:mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-secondary">Home</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-foreground">{categoryName}</span>
          </div>

          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4">{categoryName} Mock Tests</h1>
          <p className="text-muted-foreground text-sm md:text-lg">Practice with expert-designed mock tests and boost your preparation</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl mb-4">Popular Exams</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {subcategories[category as keyof typeof subcategories]?.map(sub => (
              <Card key={sub} className="text-center cursor-pointer bg-white">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-secondary" />
                <p className="text-sm md:text-base">{sub}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 md:px-5 py-2 md:py-2.5 text-sm md:text-base rounded-lg transition-all ${filter === 'all' ? 'bg-primary text-white shadow-md' : 'bg-white border border-border hover:border-secondary'}`}
          >
            All Tests
          </button>
          <button
            onClick={() => setFilter('free')}
            className={`px-3 md:px-5 py-2 md:py-2.5 text-sm md:text-base rounded-lg transition-all ${filter === 'free' ? 'bg-primary text-white shadow-md' : 'bg-white border border-border hover:border-secondary'}`}
          >
            Free Tests
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-3 md:px-5 py-2 md:py-2.5 text-sm md:text-base rounded-lg transition-all ${filter === 'paid' ? 'bg-primary text-white shadow-md' : 'bg-white border border-border hover:border-secondary'}`}
          >
            Premium Tests
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-4 pb-8 md:pb-12">
          {filteredTests.map(test => (
            <Card key={test.id} className="bg-white">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base md:text-lg pr-2">{test.name}</h3>
                        {test.free ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full whitespace-nowrap">FREE</span>
                        ) : (
                          <span className="text-xs bg-secondary/10 text-secondary px-2 md:px-3 py-1 rounded-full whitespace-nowrap">PRO</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{test.questions} Questions</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{test.duration} Min</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="hidden sm:inline">{test.attempts.toLocaleString()} Attempts</span>
                          <span className="sm:hidden">{(test.attempts / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Target className={`w-3 h-3 md:w-4 md:h-4 ${test.difficultyColor}`} />
                          <span className={test.difficultyColor}>{test.difficulty}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Language: {test.lang}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:w-40 lg:w-48">
                  <Link to={`/test/${test.id}`} className="w-full">
                    <Button variant="primary" size="md" className="w-full">Start Test</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
