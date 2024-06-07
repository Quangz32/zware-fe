import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Alert } from 'react-bootstrap';
import axios from '../../Utils/MyAxios';
import './DisposedGoods.css';

const DisposedGoods = () => {
  const [disposedGoods, setDisposedGoods] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [newDisposedGood, setNewDisposedGood] = useState({
    disposal_id: '',
    item_id: '',
    quantity: '',
    reason: '',
    warehouse_id: '',
    date: '',
    status: '',
  });
  const [viewDisposedGood, setViewDisposedGood] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showError, setShowError] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState({
    warehouse_id: '',
    date: '',
    status: ''
  });

  useEffect(() => {
    const fetchDisposedGoods = async () => {
      try {
        const response = await axios.get('/disposedgood');
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
  };

  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewDisposedGood(null);
  };

  const resetNewDisposedGood = () => {
    setNewDisposedGood({
      disposal_id: '',
      item_id: '',
      quantity: '',
      reason: '',
      warehouse_id: '',
      date: '',
      status: '',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { disposal_id, item_id, quantity, reason, warehouse_id, date, status } = newDisposedGood;

    if (!disposal_id || !item_id || !quantity || !reason || !warehouse_id || !date || !status) {
      setShowError(true);
      return;
    }

    try {
      if (editIndex !== null) {
        const updatedDisposedGood = await axios.put(`/disposedgood/${disposedGoods[editIndex].id}`, newDisposedGood);
        const updatedDisposedGoods = [...disposedGoods];
        updatedDisposedGoods[editIndex] = updatedDisposedGood.data;
        setDisposedGoods(updatedDisposedGoods);
        setEditIndex(null);
      } else {
        const response = await axios.post('/disposedgood', newDisposedGood);
        setDisposedGoods([...disposedGoods, response.data]);
      }
    } catch (error) {
      console.error('Error submitting disposed good:', error);
    }

    handleCloseAddModal();
  };

  const handleEditDisposedGood = async (index) => {
    const good = disposedGoods[index];
    setNewDisposedGood(good);
    setEditIndex(index);
    
    try {
      const response = await axios.get(`/goodsdisposal/${good.id}`);
      setAdditionalDetails(response.data);
      setNewDisposedGood({
        ...good,
        warehouse_id: response.data.warehouse_id,
        date: new Date(response.data.date).toISOString().substr(0, 10),
        status: response.data.status
      });
    } catch (error) {
      console.error('Error fetching additional details:', error);
    }
    
    handleShowAddModal();
  };

  const handleDeleteDisposedGood = async (index) => {
    try {
      await axios.delete(`/disposedgood/${disposedGoods[index].id}`);
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

    try {
      const response = await axios.get(`/goodsdisposal/${good.id}`);
      setAdditionalDetails(response.data);
    } catch (error) {
      console.error('Error fetching additional details:', error);
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
      <div className='row '>
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
      {disposedGoods.length > 0 ? (
        <Table className="table text-center">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Disposal ID</th>
              <th>Item ID</th>
              <th>Quantity</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDisposedGoods.map((good, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{good.id}</td>
                <td>{good.disposal_id}</td>
                <td>{good.item_id}</td>
                <td>{good.quantity}</td>
                <td>{good.reason}</td>
                <td>
                  <Button variant="info" onClick={() => handleViewDisposedGood(index)}>View</Button>{' '}
                  <Button variant="warning" onClick={() => handleEditDisposedGood(index)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteDisposedGood(index)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p style={{color: 'white'}}>No disposed goods found.</p>
      )}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Disposed Good' : 'Add Disposed Good'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showError && <Alert variant="danger">Please fill in all fields.</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDisposedGoodDisposalID">
              <Form.Label>Disposal ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter disposal ID"
                value={newDisposedGood.disposal_id}
                onChange={(e) => setNewDisposedGood({ ...newDisposedGood, disposal_id: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDisposedGoodItemID">
              <Form.Label>Item ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item ID"
                value={newDisposedGood.item_id}
                onChange={(e) => setNewDisposedGood({ ...newDisposedGood, item_id: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDisposedGoodQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={newDisposedGood.quantity}
                onChange={(e) => setNewDisposedGood({ ...newDisposedGood, quantity: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDisposedGoodReason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason for disposal"
                value={newDisposedGood.reason}
                onChange={(e) => setNewDisposedGood({ ...newDisposedGood, reason: e.target.value })}
              />
            </Form.Group>
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
              <Button variant="secondary" onClick={handleCloseAddModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {editIndex !== null ? 'Save Changes' : 'Add Disposed Good'}
              </Button>
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
              <p><strong>Warehouse ID:</strong> {additionalDetails.warehouse_id}</p>
              <p><strong>Disposal ID:</strong> {viewDisposedGood.disposal_id}</p>
              <p><strong>Item ID:</strong> {viewDisposedGood.item_id}</p>
              <p><strong>Quantity:</strong> {viewDisposedGood.quantity}</p>
              <p><strong>Date:</strong> {additionalDetails.date}</p>
              <p><strong>Reason:</strong> {viewDisposedGood.reason}</p>
              <p><strong>Status:</strong> {additionalDetails.status}</p>
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
