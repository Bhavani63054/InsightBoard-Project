import React, { useRef } from 'react'
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function ChartDisplay({ chartData }) {
  const chartRef = useRef()
  if (!chartData) return <p style={{color:'#6B7280'}}>No chart yet. Add data to begin.</p>

  const data = {
    labels: chartData.labels,
    datasets: [{
      label: 'Values',
      data: chartData.values,
      backgroundColor: ['#4F46E5', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6'],
      borderColor: '#FFFFFF',
      borderWidth: 1
    }]
  }

  const exportPNG = async () => {
    const canvas = await html2canvas(chartRef.current)
    const link = document.createElement('a')
    link.download = 'chart.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  const exportPDF = async () => {
    const canvas = await html2canvas(chartRef.current)
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF()
    pdf.addImage(img, 'PNG', 10, 10, 180, 100)
    pdf.save('chart.pdf')
  }

  const Chart = () => {
    switch (chartData.chartType) {
      case 'bar': return <Bar data={data} />
      case 'line': return <Line data={data} />
      case 'pie': return <Pie data={data} />
      case 'doughnut': return <Doughnut data={data} />
      case 'radar': return <Radar data={data} />
      default: return <Bar data={data} />
    }
  }

  return (
    <div>
      <div ref={chartRef} style={{height:360, padding:10}}>
        <Chart />
      </div>
      <div style={{display:'flex', gap:8, marginTop:10}}>
        <button onClick={exportPNG} style={{padding:'8px 10px', borderRadius:6, border:'1px solid #E5E7EB'}}>Export PNG</button>
        <button onClick={exportPDF} style={{padding:'8px 10px', borderRadius:6, border:'1px solid #E5E7EB'}}>Export PDF</button>
      </div>
    </div>
  )
}
