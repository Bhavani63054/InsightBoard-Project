import React, { useState } from 'react'
import DataForm from './components/DataForm'
import ChartDisplay from './components/ChartDisplay'
import ChartOptions from './components/ChartOptions'

export default function App() {
  const [payload, setPayload] = useState({ data: {}, chartType: 'bar' })
  const [chartData, setChartData] = useState(null)

  const handleGenerate = async (p) => {
    setPayload(p)
    try {
      const res = await fetch('http://localhost:8080/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p)
      })
      if (!res.ok) throw new Error('Server error')
      const json = await res.json()
      setChartData(json)
    } catch (e) {
      console.error(e)
      const labels = Object.keys(p.data)
      const values = Object.values(p.data).map(Number)
      setChartData({ labels, values, chartType: p.chartType })
    }
  }

  return (
    <div className="container">
      <h1 style={{fontSize:28, fontWeight:700, marginBottom:12}}>InsightBoard</h1>
      <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:20}}>
        <div>
          <DataForm onGenerate={handleGenerate} />
          <ChartOptions payload={payload} setPayload={setPayload} onGenerate={() => handleGenerate(payload)} />
        </div>
        <div style={{background:'#fff', padding:12, borderRadius:8}}>
          <ChartDisplay chartData={chartData} />
        </div>
      </div>
    </div>
  )
}
