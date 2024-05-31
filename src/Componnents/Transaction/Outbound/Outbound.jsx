import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Outbound.css';

const Outbound = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [details, setDetails] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    maker_id: '',
    maker_name: '',
    status: '',
    destination: '',
  });
  const [quantityMap, setQuantityMap] = useState({});
  const [newRows, setNewRows] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
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
    axios.get(`/api/outbound-transactions/${transaction.id}/details`)
      .then(response => {
        setDetails(response.data);
        const initialValues = response.data.reduce((acc, detail) => {
          acc[detail.item_id] = {
            item_id: detail.item_id,
            quantity: detail.quantity || '',
            zone: detail.zone || ''
          };
          return acc;
        }, {});
        setQuantityMap(initialValues);
      })
      .catch(error => {
        console.error('There was an error fetching the transaction details!', error);
      });
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setDetails([]);
    setQuantityMap({});
    setNewRows([]);
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleQuantityChange = (e, itemId, field) => {
    const { value } = e.target;
    setQuantityMap({
      ...quantityMap,
      [itemId]: {
        ...quantityMap[itemId],
        [field]: value
      }
    });
  };

  const handleNewRowChange = (e, index, field) => {
    const { value } = e.target;
    const updatedRows = newRows.map((row, i) => 
      i === index ? { ...row, [field]: value } : row
    );
    setNewRows(updatedRows);
  };

  const addNewRow = () => {
    setNewRows([...newRows, { item_id: '', quantity: '', zone: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransactionWithId = {
      ...newTransaction,
      id: transactions.length + 1,
    };
    setTransactions([...transactions, newTransactionWithId]);
    handleFormModalClose();
  };

  const handleSaveDetails = () => {
    const updatedDetails = details.map(detail => ({
      ...detail,
      item_id: quantityMap[detail.item_id].item_id,
      quantity: quantityMap[detail.item_id].quantity,
      zone: quantityMap[detail.item_id].zone,
    }));
    const newDetailRows = newRows.map(row => ({
      item_id: row.item_id,
      quantity: row.quantity,
      zone: row.zone,
    }));
    setDetails([...updatedDetails, ...newDetailRows]);
    setSelectedTransaction(null);
    setDetails([]);
    setQuantityMap({});
    setNewRows([]);
  };

  const handleDeleteRow = (itemId) => {
    const updatedDetails = details.filter(detail => detail.item_id !== itemId);
    const { [itemId]: _, ...updatedQuantityMap } = quantityMap;
    setDetails(updatedDetails);
    setQuantityMap(updatedQuantityMap);
  };

  const handleDeleteNewRow = (index) => {
    const updatedRows = newRows.filter((_, i) => i !== index);
    setNewRows(updatedRows);
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
            <th>Maker Name</th>
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
              <td>{transaction.maker_name}</td>
              <td>{transaction.status}</td>
              <td>{transaction.destination}</td>
              <td>
                <Button variant="primary" onClick={() => handleViewDetails(transaction)}>Detail</Button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {details.map((detail, index) => (
                <tr key={detail.item_id}>
                  <td>
                    <Form.Control 
                      type="text" 
                      value={quantityMap[detail.item_id].item_id} 
                      onChange={(e) => handleQuantityChange(e, detail.item_id, 'item_id')} 
                      required 
                    />
                  </td>
                  <td>
                    <Form.Control 
                      type="number" 
                      value={quantityMap[detail.item_id].quantity} 
                      onChange={(e) => handleQuantityChange(e, detail.item_id, 'quantity')} 
                      required 
                    />
                  </td>
                  <td>
                    <Form.Control 
                      type="text" 
                      value={quantityMap[detail.item_id].zone} 
                      onChange={(e) => handleQuantityChange(e, detail.item_id, 'zone')} 
                      required 
                    />
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteRow(detail.item_id)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {newRows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control 
                      type="text" 
                      value={row.item_id} 
                      onChange={(e) => handleNewRowChange(e, index, 'item_id')} 
                      required 
                    />
                  </td>
                  <td>
                    <Form.Control 
                      type="number" 
                      value={row.quantity} 
                      onChange={(e) => handleNewRowChange(e, index, 'quantity')} 
                      required 
                    />
                  </td>
                  <td>
                    <Form.Control 
                      type="text" 
                      value={row.zone} 
                      onChange={(e) => handleNewRowChange(e, index, 'zone')} 
                      required 
                    />
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteNewRow(index)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="secondary" onClick={addNewRow}>Add New Row</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveDetails}>Save</Button>
        </Modal.Footer>
      </Modal>
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
    </div>
  );
};

export default Outbound;
