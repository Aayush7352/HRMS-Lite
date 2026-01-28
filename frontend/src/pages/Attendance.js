import React, { useState, useEffect } from 'react';
import { FaPlus, FaFilter, FaCheckCircle, FaTimesCircle, FaCalendar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { attendanceAPI, employeeAPI } from '../services/api';
import './Attendance.css';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterEmployee, setFilterEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'table'
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [summaries, setSummaries] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      fetchAttendance();
    }
  }, [filterEmployee, selectedMonth, employees]);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      
      // Get month range
      const year = selectedMonth.getFullYear();
      const month = selectedMonth.getMonth();
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      
      params.startDate = startDate.toISOString().split('T')[0];
      params.endDate = endDate.toISOString().split('T')[0];
      
      if (filterEmployee) {
        params.employeeId = filterEmployee;
      }

      const response = await attendanceAPI.getAll(params);
      setAttendanceRecords(response.data.data);

      // Fetch summaries
      if (filterEmployee) {
        // Single employee summary
        try {
          const summaryRes = await attendanceAPI.getSummary(filterEmployee);
          setSummaries({ [filterEmployee]: summaryRes.data.data });
        } catch (err) {
          console.error('Error fetching summary:', err);
        }
      } else {
        // All employees summaries
        const summaryPromises = employees.map(emp =>
          attendanceAPI.getSummary(emp.employeeId)
            .then(res => ({ [emp.employeeId]: res.data.data }))
            .catch(() => ({ [emp.employeeId]: null }))
        );
        const summaryResults = await Promise.all(summaryPromises);
        const summariesObj = Object.assign({}, ...summaryResults);
        setSummaries(summariesObj);
      }
    } catch (err) {
      setError('Failed to load attendance records');
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.employeeId) {
      errors.employeeId = 'Please select an employee';
    }

    if (!formData.date) {
      errors.date = 'Date is required';
    }

    if (!formData.status) {
      errors.status = 'Status is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      await attendanceAPI.mark(formData);
      setShowModal(false);
      setFormData({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      });
      setFormErrors({});
      fetchAttendance();
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to mark attendance';
      setFormErrors({ submit: message });
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setFormData({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
    });
    setFormErrors({});
  };

  const clearFilters = () => {
    setFilterEmployee('');
    setSelectedMonth(new Date());
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const changeMonth = (offset) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedMonth(newDate);
  };

  const getMonthCalendar = () => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const calendar = [];
    let week = new Array(7).fill(null);
    
    // Fill in the days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = (startingDayOfWeek + day - 1) % 7;
      week[dayOfWeek] = day;
      
      if (dayOfWeek === 6 || day === daysInMonth) {
        calendar.push([...week]);
        week = new Array(7).fill(null);
      }
    }
    
    return calendar;
  };

  const getAttendanceForDate = (employeeId, day) => {
    if (!day) return null;
    
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    
    return attendanceRecords.find(
      record => record.employeeId === employeeId && record.date.split('T')[0] === dateStr
    );
  };

  const renderCalendarView = () => {
    const calendar = getMonthCalendar();
    const displayEmployees = filterEmployee 
      ? employees.filter(emp => emp.employeeId === filterEmployee)
      : employees;

    return (
      <div className="calendar-view">
        {displayEmployees.map(employee => (
          <div key={employee._id} className="employee-calendar-card card">
            <div className="employee-calendar-header">
              <div className="employee-info">
                <h3>{employee.fullName}</h3>
                <p className="employee-details">
                  <span className="badge badge-info">{employee.employeeId}</span>
                  <span className="department-tag">{employee.department}</span>
                </p>
              </div>
              {summaries[employee.employeeId] && (
                <div className="quick-summary">
                  <div className="summary-item">
                    <FaCheckCircle className="stat-icon-success" />
                    <span>{summaries[employee.employeeId].totalPresent} Present</span>
                  </div>
                  <div className="summary-item">
                    <FaTimesCircle className="stat-icon-danger" />
                    <span>{summaries[employee.employeeId].totalAbsent} Absent</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="calendar-grid">
              <div className="calendar-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="weekday-label">{day}</div>
                ))}
              </div>
              
              <div className="calendar-days">
                {calendar.map((week, weekIndex) => (
                  <React.Fragment key={weekIndex}>
                    {week.map((day, dayIndex) => {
                      const attendance = getAttendanceForDate(employee.employeeId, day);
                      const isToday = day && 
                        new Date().toDateString() === new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day).toDateString();
                      
                      return (
                        <div
                          key={dayIndex}
                          className={`calendar-day ${!day ? 'empty' : ''} ${isToday ? 'today' : ''} ${
                            attendance ? (attendance.status === 'Present' ? 'present' : 'absent') : ''
                          }`}
                        >
                          {day && (
                            <>
                              <span className="day-number">{day}</span>
                              {attendance && (
                                <span className="day-status">
                                  {attendance.status === 'Present' ? (
                                    <FaCheckCircle className="status-icon-present" />
                                  ) : (
                                    <FaTimesCircle className="status-icon-absent" />
                                  )}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTableView = () => {
    return (
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record._id}>
                  <td>{formatDate(record.date)}</td>
                  <td>
                    <span className="badge badge-info">{record.employeeId}</span>
                  </td>
                  <td>{record.employeeName}</td>
                  <td>{record.department}</td>
                  <td>
                    <span className={`badge ${record.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
                      {record.status === 'Present' ? <FaCheckCircle /> : <FaTimesCircle />}
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (loading && attendanceRecords.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="attendance-page">
      <div className="page-header">
        <div>
          <h1>Attendance Management</h1>
          <p className="page-subtitle">Track employee attendance</p>
        </div>
        <button onClick={openModal} className="btn btn-primary">
          <FaPlus />
          Mark Attendance
        </button>
      </div>

      {/* Filters and Controls */}
      <div className="card filters-card">
        <div className="filters-header">
          <h3><FaFilter /> Filters & View</h3>
          <div className="header-actions">
            <div className="view-toggle">
              <button
                onClick={() => setViewMode('calendar')}
                className={`btn btn-sm ${viewMode === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
              >
                <FaCalendar /> Calendar
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Table
              </button>
            </div>
            {filterEmployee && (
              <button onClick={clearFilters} className="btn btn-secondary btn-sm">
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        <div className="filters-grid">
          <div className="form-group">
            <label className="form-label">Filter by Employee</label>
            <select
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
              className="form-select"
            >
              <option value="">All Employees</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp.employeeId}>
                  {emp.employeeId} - {emp.fullName}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Select Month</label>
            <div className="month-selector">
              <button 
                onClick={() => changeMonth(-1)} 
                className="btn btn-secondary btn-icon"
              >
                <FaChevronLeft />
              </button>
              <span className="current-month">
                {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button 
                onClick={() => changeMonth(1)} 
                className="btn btn-secondary btn-icon"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={fetchAttendance} className="btn btn-secondary">Retry</button>
        </div>
      )}

      {attendanceRecords.length === 0 && !loading ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FaCheckCircle />
          </div>
          <h3 className="empty-state-title">
            No attendance records for this period
          </h3>
          <p className="empty-state-description">
            Start by marking attendance for your employees
          </p>
          <button onClick={openModal} className="btn btn-primary">
            <FaPlus />
            Mark Attendance
          </button>
        </div>
      ) : (
        viewMode === 'calendar' ? renderCalendarView() : renderTableView()
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Mark Attendance</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {formErrors.submit && (
                  <div className="error-message" style={{ marginBottom: '16px' }}>
                    {formErrors.submit}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Employee *</label>
                  <select
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className={`form-select ${formErrors.employeeId ? 'error' : ''}`}
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp.employeeId}>
                        {emp.employeeId} - {emp.fullName}
                      </option>
                    ))}
                  </select>
                  {formErrors.employeeId && (
                    <div className="error-message">{formErrors.employeeId}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.date ? 'error' : ''}`}
                  />
                  {formErrors.date && (
                    <div className="error-message">{formErrors.date}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={`form-select ${formErrors.status ? 'error' : ''}`}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                  {formErrors.status && (
                    <div className="error-message">{formErrors.status}</div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={submitting}
                >
                  {submitting ? 'Marking...' : 'Mark Attendance'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;