import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import StatisticCalculator from './pages/StatisticCalculator'
import About from './pages/About'
import NoPage from './pages/NoPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/niehr-website' element={<Home/>}/>
          <Route path='/niehr-website/home' element={<Home/>}/>
          <Route path='/niehr-website/about' element={<About/>}/>
          <Route path='/niehr-website/statistic-calculator' element={<StatisticCalculator/>}/>
          <Route path='*' element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
