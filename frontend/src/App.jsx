import { useState } from 'react'
import FeatureForm from './components/FeatureForm'
import SummaryCard from './components/SummaryCard'
import logo from './assets/logo.png'
import './App.css'

function App() {
  const [summaryData, setSummaryData] = useState(null)

  return (
    <div className="container">
      <img src={logo} className="logo" alt="Inscribe logo" />
      {!summaryData && (
        <>
          <h2 className="home-title">Internal Feature Request Demo</h2>
          <p className="home-subtext">Submit your notes on product feedback</p>
        </>
      )}
      
      {!summaryData ? (
        <FeatureForm onSummaryReceived={setSummaryData} />
      ) : (
        <SummaryCard 
          summary={summaryData.summary} 
          note={summaryData.note} 
          onReset={() => setSummaryData(null)} 
        />
      )}
    </div>
  )
}

export default App
