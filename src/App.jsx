import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StatisticCalculator from './pages/StatisticCalculator';
import About from './pages/About';
import NoPage from './pages/NoPage';

function App() {
  return (
    <Router basename="/niehr-website">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/statistic-calculator" element={<StatisticCalculator />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
