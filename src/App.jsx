import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import StatisticCalculator from './pages/StatisticCalculator';
import About from './pages/About';
import NoPage from './pages/NoPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router basename="/niehr-website">
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/statistic-calculator" element={<StatisticCalculator />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
