import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Analysis from './pages/Analysis'
import Insights from './pages/Insights'
import Ideas from './pages/Ideas'
import SoukSignal from './pages/SoukSignal'
import TradeTracker from './pages/TradeTracker'
import Stocks from './pages/Stocks'
import Crypto from './pages/Crypto'
import About from './pages/About'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis/insights" element={<Insights />} />
        <Route path="/analysis/ideas" element={<Ideas />} />
        <Route path="/souk-signal" element={<SoukSignal />} />
        <Route path="/trade-tracker" element={<TradeTracker />} />
        <Route path="/trade-tracker/stocks" element={<Stocks />} />
        <Route path="/trade-tracker/crypto" element={<Crypto />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
