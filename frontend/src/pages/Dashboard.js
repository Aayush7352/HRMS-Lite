import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaClipboardCheck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { dashboardAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardAPI.getStats();
      setStats(response.data.data);
    } catch (err) {
      setError('Failed to load dashboard statistics');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button onClick={fetchStats} className="btn btn-primary">Retry</button>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Employees',
      value: stats?.totalEmployees || 0,
      icon: <FaUsers />,
      color: '#4f46e5',
      onClick: () => navigate('/employees')
    },
    {
      title: 'Attendance Records',
      value: stats?.totalAttendanceRecords || 0,
      icon: <FaClipboardCheck />,
      color: '#8b5cf6',
      onClick: () => navigate('/attendance')
    },
    {
      title: 'Present Today',
      value: stats?.todayPresent || 0,
      icon: <FaCheckCircle />,
      color: '#10b981',
    },
    {
      title: 'Absent Today',
      value: stats?.todayAbsent || 0,
      icon: <FaTimesCircle />,
      color: '#ef4444',
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Overview of your HR management system</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`stat-card ${stat.onClick ? 'clickable' : ''}`}
            onClick={stat.onClick}
            style={{ borderTopColor: stat.color }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {stats?.departments && stats.departments.length > 0 && (
        <div className="card departments-section">
          <h2 className="section-title">Department Distribution</h2>
          <div className="departments-list">
            {stats.departments.map((dept, index) => (
              <div key={index} className="department-item">
                <div className="department-info">
                  <span className="department-name">{dept.department}</span>
                  <span className="department-count">{dept.count} employees</span>
                </div>
                <div className="department-bar">
                  <div
                    className="department-bar-fill"
                    style={{
                      width: `${(dept.count / stats.totalEmployees) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <button
            onClick={() => navigate('/employees')}
            className="action-card"
          >
            <FaUsers />
            <span>Manage Employees</span>
          </button>
          <button
            onClick={() => navigate('/attendance')}
            className="action-card"
          >
            <FaClipboardCheck />
            <span>Mark Attendance</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;