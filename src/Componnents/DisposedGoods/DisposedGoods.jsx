import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Alert } from 'react-bootstrap';
import axios from '../../Utils/MyAxios';
import './DisposedGoods.css';

const DisposedGoods = () => {
  const [disposedGoods, setDisposedGoods] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [newDisposedGood, setNewDisposedGood] = useState({
    warehouse_id: '',
    date: '',
    status: ''
  });
  const [viewDisposedGood, setViewDisposedGood] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [warehouseInfo, setWarehouseInfo] = useState({
    warehouseName: '',
    address: ''
  });

  useEffect(() => {
    const fetchDisposedGoods = async () => {
      try {
        const response = await axios.get('/goodsdisposal');
        setDisposedGoods(response.data);
      } catch (error) {
        console.error('Error fetching disposed goods:', error);
      }
    };

    fetchDisposedGoods();
  }, []);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    resetNewDisposedGood();
    setShowError(false);
    setErrorMessage('');
  };

  const handleShowAddModal = () => {
    setEditIndex(null);
    setShowAddModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewDisposedGood(null);
  };

  const resetNewDisposedGood = () => {
    setNewDisposedGood({
      warehouse_id: '',
      date: '',
      status: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { warehouse_id, date, status } = newDisposedGood;

    if (!warehouse_id || !date || !status) {
      setShowError(true);
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      if (editIndex !== null) {
        const updatedDisposedGood = await axios.put(`/goodsdisposal/${disposedGoods[editIndex].id}`, newDisposedGood);
        const updatedDisposedGoods = [...disposedGoods];
        updatedDisposedGoods[editIndex] = updatedDisposedGood.data;
        setDisposedGoods(updatedDisposedGoods);
        setEditIndex(null);
      } else {
        const response = await axios.post('/goodsdisposal', newDisposedGood);
        setDisposedGoods([...disposedGoods, response.data]);
      }
      setSuccessMessage('Disposed good saved successfully!');
      setShowSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
    } catch (error) {
      console.error('Error submitting disposed good:', error);
      setShowError(true);
      setErrorMessage('Error submitting disposed good. Please try again.');
    }

    handleCloseAddModal();
  };

  const handleEditDisposedGood = (index) => {
    const good = disposedGoods[index];
    setNewDisposedGood({
      warehouse_id: good.warehouse_id,
      date: good.date,
      status: good.status
    });
    setEditIndex(index);
    setShowAddModal(true);
  };

  const handleDeleteDisposedGood = async (index) => {
    if (!window.confirm('Are you sure you want to delete this disposed good?')) {
      return;
    }

    try {
      await axios.delete(`/goodsdisposal/${disposedGoods[index].id}`);
      const updatedDisposedGoods = disposedGoods.filter((_, i) => i !== index);
      setDisposedGoods(updatedDisposedGoods);
    } catch (error) {
      console.error('Error deleting disposed good:', error);
    }
  };

  const handleViewDisposedGood = async (index) => {
    const good = disposedGoods[index];
    setViewDisposedGood(good);
    setShowViewModal(true);
    // Fetch warehouse info corresponding to warehouse_id
    await fetchWarehouseInfo(good.warehouse_id);
  };

  const fetchWarehouseInfo = async (warehouseId) => {
    try {
      const response = await axios.get(`/warehouses/${warehouseId}`); // Assuming the endpoint for warehouse info
      setWarehouseInfo({
        warehouseName: response.data.name,
        address: response.data.address
      });
    } catch (error) {
      console.error('Error fetching warehouse info:', error);
    }
  };

  const filteredDisposedGoods = disposedGoods.filter((good) =>
    Object.values(good).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className='longfix1 w-60'>
      <h1>Disposed Goods</h1>
      <div className='row'>
        <div className="d-flex justify-content-between mb-2">
          <Button className="button-add" variant="primary" onClick={handleShowAddModal}>
            Add Disposed Good
          </Button>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>
      </div>
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          {successMessage}
        </Alert>
      )}
      {disposedGoods.length > 0 ? (
        <Table className="table text-center">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Warehouse ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDisposedGoods.map((good, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{good.id}</td>
                <td>{good.warehouse_id}</td>
                <td>{good.date}</td>
                <td>{good.status}</td>
                <td>
                  <div className='row w-60'>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Button variant="info" onClick={() => handleViewDisposedGood(index)}>View</Button>{' '}
                      <Button variant="warning" onClick={() => handleEditDisposedGood(index)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteDisposedGood(index)}>Delete</Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p style={{ color: 'white' }}>No disposed goods found.</p>
      )}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Disposed Good' : 'Add Disposed Good'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showError && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDisposedGoodWarehouseID">
              <Form.Label>Warehouse ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter warehouse ID"
                value={newDisposedGood.warehouse_id}
                onChange={(e) => setNewDisposedGood({ ...newDisposedGood, warehouse_id: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDisposedGoodDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date"
                value={newDisposedGood.date}
                onChange={(e) => setNewDisposedGood({ ...newDisposedGood, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDisposedGoodStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter status"
                value={newDisposedGood.status}
                onChange={(e) => setNewDisposedGood({ ...newDisposedGood, status: e.target.value })}
              />
            </Form.Group>
            <Modal.Footer>
              <div className="d-flex justify-content-start w-60">
                <Button variant="secondary mt-2" onClick={handleCloseAddModal}>
                  Close
                </Button>
                <Button variant="primary mt-2" type="submit">
                  Save Changes
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Disposed Good</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewDisposedGood && (
            <div>
                            <p><strong>ID:</strong> {viewDisposedGood.id}</p>
              <p><strong>Warehouse ID:</strong> {viewDisposedGood.warehouse_id}</p>
              <p><strong>Date:</strong> {viewDisposedGood.date}</p>
              <p><strong>Status:</strong> {viewDisposedGood.status}</p>
              <p><strong>Warehouse Name:</strong> {warehouseInfo.warehouseName}</p>
              <p><strong>Address:</strong> {warehouseInfo.address}</p>
            </div>
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

export default DisposedGoods;

