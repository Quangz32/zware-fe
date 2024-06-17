import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import MyAxios from '../../Utils/MyAxios';

const WarehouseItems = () => {
    const [items, setItems] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [newItem, setNewItem] = useState({ zone_id: '', item_id: '', quantity: '' });
    const [selectedItem, setSelectedItem] = useState({});
    const [editIndex, setEditIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch data from API on component mount
    const fetchData = async () => {
        try {
            const response = await MyAxios.get('/warehouseitems');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
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

    // Close add modal and reset form fields
    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setEditIndex(null);
        setNewItem({ zone_id: '', item_id: '', quantity: '' });
        setError('');
    };

    // Show add modal
    const handleShowAddModal = () => {
        setShowAddModal(true);
        setError('');
    };

    // Close view modal
    const handleCloseViewModal = () => setShowViewModal(false);

    // Validate item fields
    const validateItem = (item) => {
        if (!item.zone_id || !item.item_id || !item.quantity) {
            return 'Please fill in all fields.';
        }
        if (isNaN(item.zone_id) || isNaN(item.item_id) || isNaN(item.quantity)) {
            return 'Zone ID, Item ID, and Quantity must be numbers.';
        }
        // Check if zone_id and item_id already exist in items
        const existingItem = items.find(existingItem => existingItem.zone_id === item.zone_id && existingItem.item_id === item.item_id);
        if (existingItem && (!editIndex || existingItem.id !== item.id)) {
           
        return 'Zone ID and Item ID already exists.';
        }
        return '';
    };

    // Handle adding or updating item
    const handleAddItem = async () => {
        const confirmed = window.confirm("Are you sure you want to add the information?");
        if (!confirmed) {
            return;
        }

        const validationError = validateItem(newItem);
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);
        try {
            if (editIndex !== null) {
                await MyAxios.put(`/warehouseitems/${newItem.id}`, newItem);
                setSuccessMessage('Item updated successfully!');
            } else {
                await MyAxios.post('/warehouseitems', newItem);
                setSuccessMessage('Item added successfully!');
            }
            fetchData();
            handleCloseAddModal();
        } catch (error) {
            console.error('Error saving item:', error);
            setError('An error occurred while saving the item.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle deleting item
    const handleDeleteItem = async (index) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }

        setIsSubmitting(true);
        try {
            await MyAxios.delete(`/warehouseitems/${items[index].id}`);
            setSuccessMessage('Item deleted successfully!');
            fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
            setError('An error occurred while deleting the item.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle editing item
    const handleEditItem = (index) => {
        const itemToEdit = items[index];
        setNewItem({ ...itemToEdit });
        setEditIndex(index);
        handleShowAddModal();
    };

    // Handle viewing item details
    const handleViewItem = (index) => {
        const itemToView = items[index];
        setSelectedItem(itemToView);
        setShowViewModal(true);
    };

    // Filter items based on search term
    const filteredItems = items.filter((item) =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className='longfix1'>
            <h1>Warehouse Items</h1>
            <div className='row w-60'>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button className="button-add longbuttonfix2" onClick={handleShowAddModal}>
                        Add Item
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

            {filteredItems.length > 0 ? (
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Zone ID</th>
                            <th>Item ID</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.zone_id}</td>
                                <td>{item.item_id}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <div className='row w-60'>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <Button variant="info" onClick={() => handleViewItem(index)}>View</Button>
                                            <Button variant="warning" onClick={() => handleEditItem(index)}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleDeleteItem(index)}>Delete</Button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={{ color: 'white' }}>No Items Found</p>
            )}

            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? 'Edit Item' : 'Add Item'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group controlId="formZoneId">
                        <Form.Label>Zone ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter zone ID"
                            value={newItem.zone_id}
                            onChange={(e) => setNewItem({ ...newItem, zone_id: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formItemId">
                        <Form.Label>Item ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter item ID"
                            value={newItem.item_id}
                            onChange={(e) => setNewItem({ ...newItem, item_id: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter quantity"
                            value={newItem.quantity}
                            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-start w-60">
                        <Button variant="secondary mt-2" onClick={handleCloseAddModal}>
                            Close
                        </Button>
                        <Button variant="primary mt-2" onClick={handleAddItem} disabled={isSubmitting}>
                            {editIndex !== null ? 'Save' : 'Add'}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal show={showViewModal} onHide={handleCloseViewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>View Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>ID:</strong> {selectedItem.id}</p>
                    <p><strong>Zone ID:</strong> {selectedItem.zone_id}</p>
                    <p><strong>Item ID:</strong> {selectedItem.item_id}</p>
                    <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default WarehouseItems;