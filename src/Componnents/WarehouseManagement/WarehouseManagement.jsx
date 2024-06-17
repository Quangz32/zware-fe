import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import './WarehouseManagement.css';
import MyAxios from '../../Utils/MyAxios';

const WarehouseManager = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [zones, setZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({ name: '', address: '' });
  const [newZone, setNewZone] = useState({ name: '' });
  const [selectedWarehouse, setSelectedWarehouse] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewModalError, setViewModalError] = useState('');
  const [viewModalSuccess, setViewModalSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const warehouseResponse = await MyAxios.get('/warehouses');
        setWarehouses(warehouseResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData1();
  }, []);
// Clear success message after 2 seconds
useEffect(() => {
  if (successMessage) {
      const timer = setTimeout(() => {
          setSuccessMessage('');
      }, 2000);
      return () => clearTimeout(timer);
  }
}, [successMessage]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const zoneResponse = await MyAxios.get('/zones');
        setZones(zoneResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData2();
  }, []);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setEditIndex(null);
    setNewWarehouse({ name: '', address: '' });
    setViewModalError('');
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
    setViewModalError('');
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setNewZone({ name: '' });
    setFilteredZones([]);
    setViewModalError('');
  };

  const validateWarehouse = (warehouse) => {
    if (!warehouse.name || !warehouse.address) {
      return 'Please fill in all fields.';
    }
    if (warehouses.some((w) => w.name === warehouse.name && w.id !== warehouse.id)) {
      return 'Warehouse name already exists.';
    }
    return '';
  };

  const handleAddWarehouse = async () => {
    const confirmed = window.confirm("Are you sure you want to add the information?");
    if (!confirmed) {
      return;
    }

    const validationError = validateWarehouse(newWarehouse);
    if (validationError) {
      setViewModalError(validationError);
      return;
    }

    // setIsSubmitting(true);
    // try {
    //   await MyAxios.post('warehouses', newWarehouse);
    //   setViewModalSuccess('Warehouse added successfully!');
    //   fetchData();
    //   handleCloseAddModal();
    // } catch (error) {
    //   console.error(error);
    //   setViewModalError('An error occurred while saving the warehouse.');
    // } finally {
    //   setIsSubmitting(false);
    // }
    setIsSubmitting(true);
        try {
            if (editIndex !== null) {
                await MyAxios.put(`/warehouses/${newWarehouse.id}`, newWarehouse);
                setSuccessMessage('Warehouse updated successfully!');
            } else {
                await MyAxios.post('/warehouses', newWarehouse);
                setSuccessMessage('Warehouse added successfully!');
            }
            fetchData();
            handleCloseAddModal();
        } catch (error) {
            console.error('Error saving warehouse:', error);
            setError('An error occurred while saving the warehouse.');
        } finally {
            setIsSubmitting(false);
        }
  };

  const handleDeleteWarehouse = async (index) => {
    if (!window.confirm("Are you sure you want to delete this warehouse?")) {
      return;
    }

    setIsSubmitting(true);
    try {
      await MyAxios.delete(`warehouses/${warehouses[index].id}`);
      setViewModalSuccess('Warehouse deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      setViewModalError('An error occurred while deleting the warehouse.');
    } finally {
      setIsSubmitting(false);
    }
  };
// Handle editing warehouse
  const handleEditWarehouse = (index) => {
    const warehouseToEdit = warehouses[index];
    setNewWarehouse({ ...warehouseToEdit });
    setEditIndex(index);
    handleShowAddModal();
  };

  const handleViewWarehouse = (index) => {
    const warehouseToView = warehouses[index];
    setSelectedWarehouse(warehouseToView);
    setFilteredZones(zones.filter(zone => zone.warehouse_id === warehouseToView.id));
    setShowViewModal(true);
  };

  const handleAddZone = async () => {
    const newZoneData = { ...newZone, warehouse_id: selectedWarehouse.id };
    setIsSubmitting(true);
    try {
      await MyAxios.post('/zones', newZoneData);
      setViewModalSuccess('Zone added successfully!');
      setNewZone({ name: '' });
      fetchZones();
    } catch (error) {
      console.error(error);
      setViewModalError('An error occurred while adding the zone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteZone = async (zoneId) => {
    if (!window.confirm("Are you sure you want to delete this zone?")) {
      return;
    }

    setIsSubmitting(true);
    try {
      await MyAxios.delete(`zones/${zoneId}`);
      setViewModalSuccess('Zone deleted successfully!');
      fetchZones();
    } catch (error) {
      console.error(error);
      setViewModalError('An error occurred while deleting the zone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchZones = async () => {
    try {
      const zoneResponse = await MyAxios.get('/zones');
      setZones(zoneResponse.data);
      setFilteredZones(zoneResponse.data.filter(zone => zone.warehouse_id === selectedWarehouse.id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await MyAxios.get('/warehouses');
      setWarehouses(response.data);
    } catch (error) {
      console.error(error);
    }
  };
// Filter warehouse based on search term
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
          <Button className="button-add longbuttonfix2" onClick={handleShowAddModal}>
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
      {successMessage && (
                <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
                    {successMessage}
                </Alert>
            )}
            {error && <Alert variant="danger">{error}</Alert>}

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
        <p style={{ color: 'white' }}>Not Found Warehouse</p>
      )}

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Warehouse' : 'Add Warehouse'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewModalError && <Alert variant="danger">{viewModalError}</Alert>}
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
            <Button variant="secondary mt-2" onClick={handleCloseAddModal}>
              Close
            </Button>
            <Button variant="primary mt-2" onClick={handleAddWarehouse} disabled={isSubmitting}>
              {editIndex !== null ? 'Save' : 'Add'}
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

          <h4>Zones</h4>
          <Form.Group controlId="formBasicZoneName">
            <Form.Label>Zone Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zone name"
              value={newZone.name}
              onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
            />
            <Button variant="primary mt-2" onClick={handleAddZone} disabled={isSubmitting}>
              Add Zone
            </Button>
          </Form.Group>

          {viewModalSuccess && (
            <Alert variant="success" onClose={() => setViewModalSuccess('')} dismissible>
              {viewModalSuccess}
            </Alert>
          )}

          {viewModalError && <Alert variant="danger">{viewModalError}</Alert>}

          {filteredZones.length > 0 ? (
            <table className="table text-center longfixtablewarehouse">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>ID</th>
                  <th>Warehouse ID</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredZones.map((zone, index) => (
                  <tr key={zone.id}>
                    <td>{index + 1}</td>
                    <td>{zone.id}</td>
                    <td>{zone.warehouse_id}</td>
                    <td>{zone.name}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteZone(zone.id)} disabled={isSubmitting}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No zones found for this warehouse.</p>
          )}
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

