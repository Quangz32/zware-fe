import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
// import './WarehouseManager.css';  // Import the CSS file
import './WarehouseManagement.css';

const WarehouseManager = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({
    id: '',
    name: '',
    address: '',
  });
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

  const validateWarehouse = (warehouse) => {
    if (!warehouse.name || !warehouse.address) {
      return 'Please fill in all fields.';
    }
    return '';
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleAddWarehouse = () => {
    const validationError = validateWarehouse(newWarehouse);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (editIndex !== null) {
      const updatedWarehouses = [...warehouses];
      updatedWarehouses[editIndex] = newWarehouse;
      setWarehouses(updatedWarehouses);
    } else {
      const warehouseWithId = { ...newWarehouse, id: generateId() };
      setWarehouses([...warehouses, warehouseWithId]);
    }
    setNewWarehouse({
      id: '',
      name: '',
      address: '',
    });
    handleCloseAddModal();
  };

  const handleDeleteWarehouse = (index) => {
    const updatedWarehouses = [...warehouses];
    updatedWarehouses.splice(index, 1);
    setWarehouses(updatedWarehouses);
  };

  const handleEditWarehouse = (index) => {
    const warehouseToEdit = warehouses[index];
    setNewWarehouse({ ...warehouseToEdit });
    setEditIndex(index);
    handleShowAddModal();
  };

  const filteredWarehouses = warehouses.filter((warehouse) =>
    Object.values(warehouse).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className='container'>
      <h1>Warehouse Management</h1>
      <div className='row w-100'>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button className="button-add" variant="primary" onClick={handleShowAddModal}>
            Add Warehouse
          </Button>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <table className="table text-center">
        <thead>
          <tr>
            <th>No.</th>  {/* Moved "No." column to the beginning */}
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWarehouses.map((warehouse, index) => (
            <tr key={warehouse.id}>
              <td>{index + 1}</td>  {/* Updated to show index number */}
              <td>{warehouse.id}</td>
              <td>{warehouse.name}</td>
              <td>{warehouse.address}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditWarehouse(index)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteWarehouse(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Warehouse' : 'Add Warehouse'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter warehouse name"
              value={newWarehouse.name}
              onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter warehouse address"
              value={newWarehouse.address}
              onChange={(e) => setNewWarehouse({ ...newWarehouse, address: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddWarehouse}>
            {editIndex !== null ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WarehouseManager;
