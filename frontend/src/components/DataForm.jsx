import React, { useState, useEffect } from 'react'

export default function DataForm({ onGenerate }) {
  const [pairs, setPairs] = useState([{ key: 'Developers', value: '30' }, { key: 'Testers', value: '20' }])
  const [chartType, setChartType] = useState('bar')

  useEffect(() => {
    // when chartType changes we could notify parent; currently parent receives onGenerate payload
  }, [chartType])

  const handleChange = (i, field, val) => {
    const updated = [...pairs]
    updated[i][field] = val
    setPairs(updated)
  }

  const addPair = () => setPairs([...pairs, { key: '', value: '' }])
  const removePair = (i) => setPairs(pairs.filter((_, idx) => idx !== i))

  const handleSubmit = () => {
    const data = {}
    pairs.forEach(p => {
      if (p.key.trim()) data[p.key.trim()] = parseFloat(p.value) || 0
    })
    onGenerate({ data, chartType })
  }

  return (
    <div>
      <h2 style={{fontSize:18, marginBottom:8}}>Add Your Custom Data</h2>
      {pairs.map((p, i) => (
        <div key={i} style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
          <input type="text" placeholder="Category (e.g. Sales)" value={p.key} onChange={e => handleChange(i, 'key', e.target.value)} style={{flex:1, padding:8, borderRadius:6, border:'1px solid #E5E7EB'}} />
          <input type="number" placeholder="Value" value={p.value} onChange={e => handleChange(i, 'value', e.target.value)} style={{width:100, padding:8, borderRadius:6, border:'1px solid #E5E7EB'}} />
          <button onClick={() => removePair(i)} title="Delete" style={{background:'#EF4444', color:'#fff', border:'none', padding:'8px 10px', borderRadius:6}}>🗑️</button>
        </div>
      ))}
      <div style={{display:'flex', gap:8}}>
        <button onClick={addPair} style={{padding:'8px 10px', borderRadius:6, border:'1px solid #D1D5DB', background:'#F3F4F6'}}>+ Add</button>
        <select value={chartType} onChange={e => setChartType(e.target.value)} style={{padding:'8px 10px', borderRadius:6, border:'1px solid #D1D5DB'}}>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
          <option value="radar">Radar</option>
        </select>
        <button onClick={handleSubmit} style={{marginLeft:'auto', background:'#2563EB', color:'#fff', border:'none', padding:'8px 12px', borderRadius:6}}>Generate</button>
      </div>
    </div>
  )
}
