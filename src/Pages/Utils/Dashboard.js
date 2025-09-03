import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import '../../styles/desktop.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    dau: 0,
    mau: 0,
    stickiness: 0,
    signups: [],
    logins: [],
  });
  
  const [period, setPeriod] = useState('7d'); // 기본 7일
  const periodOptions = [
    { label: 'Last 24 hours', value: '1d' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 1 month', value: '1m' },
    { label: 'Last 3 months', value: '3m' },
    { label: 'Last 1 year', value: '1y' },
  ];

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if(!response.ok) throw new Error(`HTTP error. status: ${response.status}`);
        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        console.error('Error fetching dashboard metrics:', err);
      } finally {
      }
    };

    fetchMetrics();
  }, []);

  const filterByPeriod = (data) => {
    const now = new Date();
    let startDate = new Date();
    switch(period) {
      case '1d': startDate.setDate(now.getDate() - 1); break;
      case '7d': startDate.setDate(now.getDate() - 7); break;
      case '1m': startDate.setMonth(now.getMonth() - 1); break;
      case '3m': startDate.setMonth(now.getMonth() - 3); break;
      case '1y': startDate.setFullYear(now.getFullYear() - 1); break;
      default: startDate.setDate(now.getDate() - 7);
    }
    return data.filter(item => new Date(item.date) >= startDate);
  };

  const signupChartData = {
    labels: filterByPeriod(metrics.signups).map(s => s.date),
    datasets: [
      {
        label: 'Signups',
        data: filterByPeriod(metrics.signups).map(s => s.count),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3
      }
    ]
  };

  const chartoptions = {
    responsive: true,         // 반응형 유지
    maintainAspectRatio: true, // 캔버스 비율 유지
    aspectRatio: 2,            // 가로:세로 비율 (예: 2 = 가로가 세로의 2배)
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 20,
          padding: 10
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          count: 5
        }
      }
    }
  };

  const loginChartData = {
    labels: filterByPeriod(metrics.logins).map(l => l.date),
    datasets: [
      {
        label: 'Logins',
        data: filterByPeriod(metrics.logins).map(l => l.count),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Dashboard</h3>

      <div className="metrics-summary">
        <div className="metric-card">
          <h3>Total Users</h3>
          <p>{metrics.totalUsers}</p>
        </div>
        <div className="metric-card">
          <h3>DAU (Daily Active Users)</h3>
          <p>{metrics.dau}</p>
        </div>
        <div className="metric-card">
          <h3>MAU (Monthly Active Users)</h3>
          <p>{metrics.mau}</p>
        </div>
        <div className="metric-card">
          <h3>Stickiness (DAU/MAU)</h3>
          <p>{metrics.stickiness}%</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h1>Signups</h1>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="period-select"
          >
            {periodOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Line data={signupChartData} options={chartoptions}/>
        </div>

        <div className="chart">
          <h1>Logins</h1>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="period-select"
          >
            {periodOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Line data={loginChartData} options={chartoptions}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
