import React, { useState, useEffect } from 'react';
import axios from "../../../Utils/MyAxios"; // Import the custom Axios instance
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Outbound.css';

const Outbound = () => {
  const [transactions, setTransactions] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransactionDetails, setSelectedTransactionDetails] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);
  const [itemStock, setItemStock] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    maker_id: '',
    maker_name: '',
    status: '',
    destination: '',
  });
  const [newDetail, setNewDetail] = useState({
    item_id: '',
    quantity: '',
    zone_id: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/outbound_transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
      });
  }, []);

  const handleFormModalClose = () => {
    setShowFormModal(false);
    setNewTransaction({
      date: '',
      maker_id: '',
      maker_name: '',
      status: '',
      destination: '',
    });
  };

  const handleDetailsModalClose = () => {
    setShowDetailsModal(false);
    setSelectedTransactionDetails([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setNewDetail({ ...newDetail, [name]: value });
    if (name === 'item_id' && value) {
      fetchItemDetails(value);
      fetchItemStock(value);
    }
  };

  const fetchItemDetails = (itemId) => {
    axios.get(`/api/items/${itemId}`)
      .then(response => {
        setItemDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the item details!', error);
      });
  };

  const fetchItemStock = (itemId) => {
    axios.get(`/api/items/${itemId}/stock`)
      .then(response => {
        setItemStock(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the item stock!', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/outbound_transactions', newTransaction)
      .then(response => {
        setTransactions([...transactions, response.data]);
        handleFormModalClose();
      })
      .catch(error => {
        console.error('There was an error creating the transaction!', error);
      });
  };

  const handleDetailsClick = (id) => {
    axios.get(`/outbound_transaction_details/${id}`)
      .then(response => {
        setSelectedTransactionDetails([response.data]);
        setShowDetailsModal(true);
      })
      .catch(error => {
        console.error('There was an error fetching the transaction details!', error);
      });
  };

  const handleAddDetail = () => {
    if (parseInt(newDetail.quantity, 10) > itemStock) {
      alert(`Quantity exceeds available stock (${itemStock}).`);
      return;
    }
    setSelectedTransactionDetails([...selectedTransactionDetails, newDetail]);
    setNewDetail({
      item_id: '',
      quantity: '',
      zone_id: ''
    });
  };

  const handleSaveDetails = () => {
    axios.post('/outbound_transaction_details', selectedTransactionDetails)
      .then(response => {
        setShowDetailsModal(false);
      })
      .catch(error => {
        console.error('There was an error saving the transaction details!', error);
      });
  };

  return (
    <div className="longfix1">
      <h1 className="text-center mb-4">Outbound Transactions</h1>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" className="longbutton-fix1" onClick={() => setShowFormModal(true)}>Add New Transaction</Button>
        <Button variant="secondary" className="longbutton-fix1 long-move-buttonswitchtransaction" onClick={() => navigate('/inbound')}>Go to Inbound Transactions</Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Maker ID</th>
            <th>Status</th>
            <th>Destination Warehouse</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.maker_id}</td>
              <td>{transaction.status}</td>
              <td>{transaction.destination}</td>
              <td><Button variant="info" onClick={() => handleDetailsClick(transaction.id)}>Details</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showFormModal} onHide={handleFormModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date" 
                  name="date" 
                  value={newTransaction.date} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Maker ID</Form.Label>
                <Form.Control 
                  type="text" 
                  name="maker_id" 
                  value={newTransaction.maker_id} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Maker Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="maker_name" 
                  value={newTransaction.maker_name} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Status</Form.Label>
                <Form.Control 
                  type="text" 
                  name="status" 
                  value={newTransaction.status} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Destination</Form.Label>
                <Form.Control 
                  type="text" 
                  name="destination" 
                  value={newTransaction.destination} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
            </Row>
            <Button variant="secondary" type="submit">Add Transaction</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showDetailsModal} onHide={handleDetailsModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {selectedTransactionDetails.map((detail, index) => (
              <div key={index} className="mb-3">
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Item ID</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="item_id" 
                      value={detail.item_id} 
                      onChange={(e) => {
                        const updatedDetails = [...selectedTransactionDetails];
                        updatedDetails[index].item_id = e.target.value;
                        setSelectedTransactionDetails(updatedDetails);
                        fetchItemDetails(e.target.value);
                        fetchItemStock(e.target.value);
                      }} 
                      required 
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control 
                      type="number" 
                      name="quantity" 
                      value={detail.quantity} 
                      onChange={(e) => {
                        const updatedDetails = [...selectedTransactionDetails];
                        updatedDetails[index].quantity = e.target.value;
                        setSelectedTransactionDetails(updatedDetails);
                      }} 
                      required 
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Zone ID</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="zone_id" 
                      value={detail.zone_id} 
                      onChange={(e) => {
                        const updatedDetails = [...selectedTransactionDetails];
                        updatedDetails[index].zone_id = e.target.value;
                        setSelectedTransactionDetails(updatedDetails);
                      }} 
                      required 
                    />
                  </Form.Group>
                </Row>
                {itemDetails && (
                  <div className="item-details">
                    <p>Item Name: {itemDetails.name}</p>
                    <p>Description: {itemDetails.description}</p>
                    <p>Stock Available: {itemStock}</p>
                  </div>
                )}
              </div>
            ))}
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Item ID</Form.Label>
                <Form.Control 
                  type="text" 
                  name="item_id" 
                  value={newDetail.item_id} 
                  onChange={handleDetailChange} 
                  required 
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control 
                  type="number" 
                  name="quantity" 
                  value={newDetail.quantity} 
                  onChange={handleDetailChange} 
                  required 
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Zone ID</Form.Label>
                <Form.Control 
                  type="text" 
                  name="zone_id" 
                  value={newDetail.zone_id} 
                  onChange={handleDetailChange} 
                  required 
                />
              </Form.Group>
            </Row>
            {itemDetails && (
              <div className="item-details">
                <p>Item Name: {itemDetails.name}</p>
                <p>Description: {itemDetails.description}</p>
                <p>Stock Available: {itemStock}</p>
              </div>
            )}
            <Button variant="secondary" onClick={handleAddDetail}>Add Detail</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailsModalClose}>Close</Button>
          <Button variant="primary" onClick={handleSaveDetails}>Save Details</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Outbound;
