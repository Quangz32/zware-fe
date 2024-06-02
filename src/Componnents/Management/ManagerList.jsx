import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import './ManagerList.css';

const ManagerList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [managers, setManagers] = useState([]);
  const [newManager, setNewManager] = useState({
    name: '',
    email: '',
    role: 'manager',
    date_of_birth: '',
    phone: '',
    gender: 'male',
    warehouse_id: '',
  });
  const [viewManager, setViewManager] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setEditIndex(null);
    setError('');
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
    setError('');
  };

  const handleCloseViewModal = () => setShowViewModal(false);
  
  const validateManager = (manager) => {
    if (!manager.name || !manager.email || !manager.date_of_birth || !manager.phone || !manager.warehouse_id) {
      return 'Please fill in all fields.';
    }
    if (!/\S+@\S+\.\S+/.test(manager.email)) return 'Email is invalid.';
    if (managers.some((m, index) => m.email === manager.email && index !== editIndex)) return 'Email must be unique.';
    return '';
  };

  const handleAddManager = () => {
    const validationError = validateManager(newManager);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (editIndex !== null) {
      const updatedManagers = [...managers];
      updatedManagers[editIndex] = newManager;
      setManagers(updatedManagers);
    } else {
      setManagers([...managers, newManager]);
    }
    setNewManager({
      name: '',
      email: '',
      role: 'manager',
      date_of_birth: '',
      phone: '',
      gender: 'male',
      warehouse_id: '',
    });
    handleCloseAddModal();
  };

  const handleDeleteManager = (index) => {
    const updatedManagers = [...managers];
    updatedManagers.splice(index, 1);
    setManagers(updatedManagers);
  };

  const handleEditManager = (index) => {
    const managerToEdit = managers[index];
    setNewManager({ ...managerToEdit });
    setEditIndex(index);
    handleShowAddModal();
  };

  const handleViewManager = (index) => {
    setViewManager(managers[index]);
    setShowViewModal(true);
  };

  const filteredManagers = managers.filter((manager) => {
    const searchString = searchTerm.toLowerCase();
    return (
      manager.name.toLowerCase().includes(searchString) ||
      manager.email.toLowerCase().includes(searchString) ||
      manager.role.toLowerCase().includes(searchString) ||
      manager.date_of_birth.toLowerCase().includes(searchString) ||
      manager.phone.toLowerCase().includes(searchString) ||
      manager.gender.toLowerCase().includes(searchString) ||
      manager.warehouse_id.toLowerCase().includes(searchString)
    );
  });

  return (
    <div className='longfix1'>
      <h1>Manager List</h1>
      <div className='row w-60'>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button className="button-add longbuttonfix2" style={{ marginLeft: '140px' }} variant="primary" onClick={handleShowAddModal}>
            Add Manager
          </Button>
          <Form.Control className='longfixbutton3'
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>
      </div>
      <table className="table text-center">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Warehouse ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredManagers.map((manager, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{manager.name}</td>
              <td>{manager.email}</td>
              <td>{manager.role}</td>
              <td>{manager.date_of_birth}</td>
              <td>{manager.phone}</td>
              <td>{manager.gender}</td>
              <td>{manager.warehouse_id}</td>
              <td>
                <Button variant="info" onClick={() => handleViewManager(index)}>View</Button>{' '}
                <Button variant="warning" onClick={() => handleEditManager(index)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteManager(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Manager' : 'Add Manager'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={newManager.name}
              onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={newManager.email}
              onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBasicRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={newManager.role}
              onChange={(e) => setNewManager({ ...newManager, role: e.target.value })}
            >
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={newManager.date_of_birth}
              onChange={(e) => setNewManager({ ...newManager, date_of_birth: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              value={newManager.phone}
              onChange={(e) => setNewManager({ ...newManager, phone: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={newManager.gender}
              onChange={(e) => setNewManager({ ...newManager, gender: e.target.value })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicWarehouseID">
            <Form.Label>Warehouse ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter warehouse ID"
              value={newManager.warehouse_id}
              onChange={(e) => setNewManager({ ...newManager, warehouse_id: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddManager}>
            {editIndex !== null ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>

      {viewManager && (
        <Modal show={showViewModal} onHide={handleCloseViewModal}>
          <Modal.Header closeButton>
            <Modal.Title>View Manager</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Name:</strong> {viewManager.name}</p>
            <p><strong>Email:</strong> {viewManager.email}</p>
            <p><strong>Role:</strong> {viewManager.role}</p>
            <p><strong>Date of Birth:</strong> {viewManager.date_of_birth}</p>
            <p><strong>Phone:</strong> {viewManager.phone}</p>
            <p><strong>Gender:</strong> {viewManager.gender}</p>
            <p><strong>Warehouse ID:</strong> {viewManager.warehouse_id}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ManagerList;
