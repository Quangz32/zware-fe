import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import './ManagerList.css';

const ManagerList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [managers, setManagers] = useState([]);
  const [newManager, setNewManager] = useState({
    name: '',
    email: '',
    role: 'manager',
    dateOfBirth: '',
    phone: '',
    gender: 'male',
    numberOfWarehouse: 0,
  });
  const [editIndex, setEditIndex] = useState(null); // New state for tracking edit index

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setEditIndex(null); // Reset edit index when modal is closed
  };

  const handleShowAddModal = () => setShowAddModal(true);

  const handleAddManager = () => {
    if (editIndex !== null) {
      // If editing, update existing manager
      const updatedManagers = [...managers];
      updatedManagers[editIndex] = newManager;
      setManagers(updatedManagers);
    } else {
      // If adding, add new manager
      setManagers([...managers, newManager]);
    }
    setNewManager({
      name: '',
      email: '',
      role: 'manager',
      dateOfBirth: '',
      phone: '',
      gender: 'male',
      numberOfWarehouse: 0,
    });
    handleCloseAddModal();
  };

  const handleDeleteManager = (index) => {
    const updatedManagers = [...managers];
    updatedManagers.splice(index, 1);
    setManagers(updatedManagers);
  };

  const handleEditManager = (index) => {
    const managerToEdit = managers[index]; // Get the manager to edit
    setNewManager({ ...managerToEdit }); // Populate form fields with manager's details
    setEditIndex(index); // Set the index of the manager being edited
    handleShowAddModal(); // Show the modal
  };

  return (
    <div className='container '>
      <div>
      <h1>Manager List</h1>
      <Button className="button-add p-4" variant="primary" onClick={handleShowAddModal}>
        Add Manager
      </Button>
      <table className="table text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>WarehousesID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager, index) => (
            <tr key={index}>
              <td>{manager.name}</td>
              <td>{manager.email}</td>
              <td>{manager.role}</td>
              <td>{manager.dateOfBirth}</td>
              <td>{manager.phone}</td>
              <td>{manager.gender}</td>
              <td>{manager.numberOfWarehouse}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditManager(index)}>Edit</Button>
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
              value={newManager.dateOfBirth}
              onChange={(e) => setNewManager({ ...newManager, dateOfBirth: e.target.value })}
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
          <Form.Group controlId="formBasicNumberOfWarehouses">
            <Form.Label>Number of Warehouses</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of warehouses"
              value={newManager.numberOfWarehouse}
              onChange={(e) => setNewManager({ ...newManager, numberOfWarehouse: parseInt(e.target.value) })}
            />
          </Form.Group>
          {/* Add more form fields for other properties */}
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
    </div>
    </div>
  );
};

export default ManagerList;
