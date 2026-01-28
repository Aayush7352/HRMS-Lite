import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaUserTie } from 'react-icons/fa';
import { employeeAPI } from '../services/api';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    department: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data);
    } catch (err) {
      setError('Failed to load employees');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.employeeId.trim()) {
      errors.employeeId = 'Employee ID is required';
    }

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.department.trim()) {
      errors.department = 'Department is required';
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
      await employeeAPI.create(formData);
      setShowModal(false);
      setFormData({ employeeId: '', fullName: '', email: '', department: '' });
      setFormErrors({});
      fetchEmployees();
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create employee';
      setFormErrors({ submit: message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await employeeAPI.delete(id);
        fetchEmployees();
      } catch (err) {
        alert('Failed to delete employee');
        console.error('Error deleting employee:', err);
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
    setFormData({ employeeId: '', fullName: '', email: '', department: '' });
    setFormErrors({});
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="employees-page">
      <div className="page-header">
        <div>
          <h1>Employee Management</h1>
          <p className="page-subtitle">Manage your workforce</p>
        </div>
        <button onClick={openModal} className="btn btn-primary">
          <FaPlus />
          Add Employee
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={fetchEmployees} className="btn btn-secondary">Retry</button>
        </div>
      )}

      {employees.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FaUserTie />
          </div>
          <h3 className="empty-state-title">No employees yet</h3>
          <p className="empty-state-description">
            Get started by adding your first employee
          </p>
          <button onClick={openModal} className="btn btn-primary">
            <FaPlus />
            Add Employee
          </button>
        </div>
      ) : (
        <div className="card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>
                      <span className="badge badge-info">{employee.employeeId}</span>
                    </td>
                    <td>{employee.fullName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(employee._id, employee.fullName)}
                        className="btn-icon btn-danger"
                        title="Delete Employee"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Employee</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {formErrors.submit && (
                  <div className="error-message" style={{ marginBottom: '16px' }}>
                    {formErrors.submit}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Employee ID *</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.employeeId ? 'error' : ''}`}
                    placeholder="e.g., EMP001"
                  />
                  {formErrors.employeeId && (
                    <div className="error-message">{formErrors.employeeId}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.fullName ? 'error' : ''}`}
                    placeholder="John Doe"
                  />
                  {formErrors.fullName && (
                    <div className="error-message">{formErrors.fullName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    placeholder="john.doe@company.com"
                  />
                  {formErrors.email && (
                    <div className="error-message">{formErrors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Department *</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.department ? 'error' : ''}`}
                    placeholder="Engineering"
                  />
                  {formErrors.department && (
                    <div className="error-message">{formErrors.department}</div>
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
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Adding...' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
