import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from './Button';
import { Flag, ChevronLeft, ChevronRight, AlertCircle, Menu, X } from 'lucide-react';

type QuestionStatus = 'not-visited' | 'not-answered' | 'answered' | 'flagged' | 'answered-flagged';

interface Question {
  id: number;
  text: string;
  options: string[];
  status: QuestionStatus;
  selectedAnswer?: number;
}

export function TestPlayer() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [showPalette, setShowPalette] = useState(false);

  const [questions, setQuestions] = useState<Question[]>(
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1}: What is the value of x in the equation 2x + 5 = 15? This is a sample question to demonstrate the test player interface.`,
      options: [
        'Option A: x = 5',
        'Option B: x = 10',
        'Option C: x = 7.5',
        'Option D: x = 2.5'
      ],
      status: 'not-visited' as QuestionStatus
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    setQuestions(prev => prev.map((q, idx) =>
      idx === currentQuestion
        ? { ...q, selectedAnswer: optionIndex, status: q.status === 'flagged' ? 'answered-flagged' : 'answered' }
        : q
    ));
  };

  const handleFlag = () => {
    setQuestions(prev => prev.map((q, idx) =>
      idx === currentQuestion
        ? {
            ...q,
            status: q.status === 'answered' ? 'answered-flagged' :
                   q.status === 'flagged' ? 'not-answered' :
                   q.status === 'answered-flagged' ? 'answered' : 'flagged'
          }
        : q
    ));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setQuestions(prev => prev.map((q, idx) =>
        idx === currentQuestion && q.status === 'not-visited'
          ? { ...q, status: 'not-answered' }
          : q
      ));
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the test?')) {
      navigate(`/result/${testId}`);
    }
  };

  const handleQuestionClick = (index: number) => {
    if (questions[currentQuestion].status === 'not-visited') {
      setQuestions(prev => prev.map((q, idx) =>
        idx === currentQuestion ? { ...q, status: 'not-answered' } : q
      ));
    }
    setCurrentQuestion(index);
  };

  const currentQ = questions[currentQuestion];
  const answered = questions.filter(q => q.status === 'answered' || q.status === 'answered-flagged').length;
  const notAnswered = questions.filter(q => q.status === 'not-answered').length;
  const flagged = questions.filter(q => q.status === 'flagged' || q.status === 'answered-flagged').length;
  const notVisited = questions.filter(q => q.status === 'not-visited').length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
        <div className="px-3 md:px-6 py-2 md:py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {showPalette ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-sm md:text-lg truncate pr-2">SSC CGL Tier 1 Mock Test</h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className={`text-base md:text-xl px-3 md:px-5 py-1.5 md:py-2 rounded-lg font-mono ${timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-primary'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 p-3 md:p-6 lg:p-10 overflow-y-auto bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-border p-4 md:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <span className="text-xs md:text-sm bg-blue-100 text-primary px-2 md:px-3 py-1 rounded-full">Question {currentQuestion + 1}/{questions.length}</span>
                <button
                  onClick={handleFlag}
                  className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg border transition-colors ${
                    currentQ.status === 'flagged' || currentQ.status === 'answered-flagged'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-border hover:border-orange-500'
                  }`}
                >
                  <Flag className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">{currentQ.status === 'flagged' || currentQ.status === 'answered-flagged' ? 'Flagged' : 'Flag'}</span>
                </button>
              </div>

              <h3 className="text-base md:text-xl mb-6 md:mb-8 leading-relaxed">{currentQ.text}</h3>

              <div className="space-y-2 md:space-y-3">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all ${
                      currentQ.selectedAnswer === idx
                        ? 'border-primary bg-blue-50 shadow-md'
                        : 'border-border hover:border-primary/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        currentQ.selectedAnswer === idx ? 'border-primary bg-primary' : 'border-gray-300'
                      }`}>
                        {currentQ.selectedAnswer === idx && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>}
                      </div>
                      <span className="text-sm md:text-base">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showPalette && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowPalette(false)} />
        )}

        <div className={`${showPalette ? 'fixed' : 'hidden'} lg:block lg:relative inset-y-0 right-0 w-80 border-l border-border p-4 md:p-6 overflow-y-auto bg-white z-50 shadow-2xl lg:shadow-none transition-transform`}>
          <div className="sticky top-0">
            <h3 className="mb-3 md:mb-4 text-sm md:text-base">Question Palette</h3>

            <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs mb-4 md:mb-6 bg-gray-50 p-3 md:p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-primary rounded flex-shrink-0"></div>
                <span className="text-xs">Answered ({answered})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded flex-shrink-0"></div>
                <span className="text-xs">Skipped ({notAnswered})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-orange-500 rounded flex-shrink-0"></div>
                <span className="text-xs">Flagged ({flagged})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-200 border border-gray-300 rounded flex-shrink-0"></div>
                <span className="text-xs">Not Visited ({notVisited})</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1.5 md:gap-2">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionClick(idx)}
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center text-xs md:text-sm transition-all ${
                    idx === currentQuestion
                      ? 'ring-2 ring-secondary ring-offset-2'
                      : ''
                  } ${
                    q.status === 'answered' || q.status === 'answered-flagged'
                      ? 'bg-primary text-white shadow-sm'
                      : q.status === 'not-answered'
                      ? 'bg-red-500 text-white shadow-sm'
                      : q.status === 'flagged'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-200 border border-gray-300 hover:bg-gray-300'
                  }`}
                >
                  {q.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-white px-3 md:px-6 py-3 md:py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-1 md:gap-2 text-xs md:text-base px-3 md:px-6"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          <Button variant="destructive" size="sm" onClick={handleSubmit} className="text-xs md:text-base px-3 md:px-6">
            Submit
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            className="flex items-center gap-1 md:gap-2 text-xs md:text-base px-3 md:px-6"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
