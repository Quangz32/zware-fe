// src/components/Outbound.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import './Outbound.css';

const Outbound = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [details, setDetails] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    maker: '',
    status: '',
    destination: ''
  });

  useEffect(() => {
    // Fetch the transactions when the component mounts
    axios.get('/api/outbound-transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
      });
  }, []);

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    // Fetch the transaction details
    axios.get(`/api/outbound-transactions/${transaction.id}/details`)
      .then(response => {
        setDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the transaction details!', error);
      });
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setDetails([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransactionWithId = {
      ...newTransaction,
      id: transactions.length + 1, // Generate a new id for simplicity
    };
    setTransactions([...transactions, newTransactionWithId]);
    setNewTransaction({
      date: '',
      maker: '',
      status: '',
      destination: ''
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Outbound Transactions</h1>
      <Form onSubmit={handleSubmit} className="mb-4">
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
            <Form.Label>Maker</Form.Label>
            <Form.Control 
              type="text" 
              name="maker" 
              value={newTransaction.maker} 
              onChange={handleInputChange} 
              required 
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
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
        <Button variant="primary" type="submit">Add Transaction</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Maker</th>
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
              <td>{transaction.maker}</td>
              <td>{transaction.status}</td>
              <td>{transaction.destination}</td>
              <td>
                <Button variant="primary" onClick={() => handleViewDetails(transaction)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={!!selectedTransaction} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Quantity</th>
                <th>Zone</th>
              </tr>
            </thead>
            <tbody>
              {details.map((detail) => (
                <tr key={detail.item_id}>
                  <td>{detail.item_id}</td>
                  <td>{detail.quantity}</td>
                  <td>{detail.zone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Outbound;
