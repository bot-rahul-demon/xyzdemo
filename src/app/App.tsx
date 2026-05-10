import { BrowserRouter, Routes, Route } from 'react-router';
import { LandingPage } from './components/LandingPage';
import { CategoryPage } from './components/CategoryPage';
import { TestPlayer } from './components/TestPlayer';
import { ResultPage } from './components/ResultPage';
import { LeaderboardPage } from './components/LeaderboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/test/:testId" element={<TestPlayer />} />
        <Route path="/result/:testId" element={<ResultPage />} />
        <Route path="/leaderboard/:testId" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}