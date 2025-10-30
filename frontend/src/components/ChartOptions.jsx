import React from 'react'

export default function ChartOptions({ payload, setPayload, onGenerate }) {
  const chartTypes = ['bar', 'line', 'pie', 'doughnut', 'radar']

  return (
    <div style={{marginTop:16}}>
      <h3 style={{fontSize:16, marginBottom:6}}>Quick Controls</h3>
      <div style={{display:'flex', gap:8}}>
        <select
          value={payload.chartType}
          onChange={e => setPayload({ ...payload, chartType: e.target.value })}
          style={{padding:8, borderRadius:6, border:'1px solid #E5E7EB'}}
        >
          {chartTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button onClick={onGenerate} style={{background:'#10B981', color:'#fff', border:'none', padding:'8px 12px', borderRadius:6}}>Render Chart</button>
      </div>
    </div>
  )
}
