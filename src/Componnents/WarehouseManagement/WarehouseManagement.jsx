/* eslint-disable no-restricted-globals */

import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
// import './WarehouseManager.css';  // Import the CSS file
import './WarehouseManagement.css';
import MyAxios from '../../Utils/MyAxios'



const WarehouseManager = () => {
  const [warehouses, setWarehouses] = useState([]);
  //fetch Warehouse list (From BE)
  const fetchData = async () => {
    try {
      const response = await MyAxios.get('warehouses');
      console.log(response.data);
      setWarehouses(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [newWarehouse, setNewWarehouse] = useState({
    // id: '',
    name: '',
    address: '',
  });
  const [selectedWarehouse, setSelectedWarehouse] = useState({});

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

  const validateWarehouse = (warehouse) => {
    if (!warehouse.name || !warehouse.address) {
      return 'Please fill in all fields.';
    }
    return '';
  };

  const handleAddWarehouse = async () => {
    const validationError = validateWarehouse(newWarehouse);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (editIndex !== null) {
      const warehouseToEdit = warehouses[editIndex];
      console.log(newWarehouse);
      await MyAxios.put(`warehouses/${warehouseToEdit.id}`, {
        name: newWarehouse.name,
        address: newWarehouse.address
      });
    } else {
      await MyAxios.post(`warehouses`, newWarehouse);
    }
    setNewWarehouse({
      name: '',
      address: '',
    });
    fetchData();
    handleCloseAddModal();
  };

  const handleDeleteWarehouse = async (index) => {
    if (!confirm("Are you sure to delete this warehouse?")) {
      return;
    };

    await MyAxios.delete(`warehouses/${warehouses[index].id}`);
    fetchData();

  };

  const handleEditWarehouse = (index) => {
    const warehouseToEdit = warehouses[index];
    setNewWarehouse({ ...warehouseToEdit });
    setEditIndex(index);
    handleShowAddModal();
  };

  const handleViewWarehouse = (index) => {
    const warehouseToView = warehouses[index];
    setSelectedWarehouse(warehouseToView);
    setShowViewModal(true);
  };

  const filteredWarehouses = warehouses.filter((warehouse) =>
    Object.values(warehouse).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className='longfix1'>
      <h1>Warehouse Management</h1>
      <div className='row w-60'>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button className="button-add longbuttonfix2" style={{ marginLeft: '140px' }} variant="primary" onClick={handleShowAddModal}>
            Add Warehouse
          </Button>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{ marginRight: '114px' }}
          />
        </div>
      </div>
      {filteredWarehouses.length > 0 ? (
        <table className="table text-center">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWarehouses.map((warehouse, index) => (
              <tr key={warehouse.id}>
                <td>{index + 1}</td>
                <td>{warehouse.id}</td>
                <td>{warehouse.name}</td>
                <td>{warehouse.address}</td>
                <td>
                  <div className='row w-60'>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Button variant="info" onClick={() => handleViewWarehouse(index)}>View</Button>
                      <Button variant="warning" onClick={() => handleEditWarehouse(index)}>Edit</Button>
                      <Button variant="danger" onClick={() => handleDeleteWarehouse(index)}>Delete</Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (

        <p style={{ color: 'white' }}>No warehouse found.</p>

      )}

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
          <div className="d-flex justify-content-start w-60">
            <Button variant="secondary  mt-2 " onClick={handleCloseAddModal}>
              Close
            </Button>
            <Button variant="btn btn-primary primary  mt-2 " onClick={handleAddWarehouse}>
              {editIndex !== null ? 'Save Changes' : 'Add'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Warehouse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>ID:</strong> {selectedWarehouse.id}</p>
          <p><strong>Name:</strong> {selectedWarehouse.name}</p>
          <p><strong>Address:</strong> {selectedWarehouse.address}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WarehouseManager;
