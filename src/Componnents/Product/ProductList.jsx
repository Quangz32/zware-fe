import React, { useState } from 'react';
import { Button, Modal, Form, Table, Alert } from 'react-bootstrap';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '', // Removed id field from initial state
    name: '',
    category_id: '',
    price: '',
    quantity: '',
    measure_unit: '',
    expiry_date: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showError, setShowError] = useState(false);
  const [nextId, setNextId] = useState(1);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    resetNewProduct();
  };

  const handleShowAddModal = () => setShowAddModal(true);

  const resetNewProduct = () => {
    setNewProduct({
      name: '',
      category_id: '',
      price: '',
      quantity: '',
      measure_unit: '',
      expiry_date: '',
    });
  };

  const generateId = () => {
    // Generate sequential numeric ID with four digits
    const paddedId = String(nextId).padStart(4, '0');
    setNextId(nextId + 1); // Increment the ID for the next product
    return paddedId;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, category_id, price, quantity, measure_unit, expiry_date } = newProduct;

    // Check if all fields are filled
    if (!name || !category_id || !price || !quantity || !measure_unit || !expiry_date) {
      setShowError(true);
      return;
    }

    const id = generateId(); // Generate ID
    const updatedProduct = { ...newProduct, id, price: price + ' VND' }; // Concatenate 'VND' to the price

    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = updatedProduct;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([...products, updatedProduct]);
    }

    handleCloseAddModal();
  };

  const handleEditProduct = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
    handleShowAddModal();
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to check if a product is expired
  const isExpired = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return today > expiry;
  };

  return (
    <div className='longfix1'>
      <h1>Product List</h1>
      <div className='row w-100'>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button className="button-add longbuttonfix2" style={{ marginLeft: '140px' }}  variant="primary" onClick={handleShowAddModal}>
            Add Product
          </Button>
          <Form.Control className='longfixbutton3'
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>
      </div>
      <Table className="table text-center">
        <thead>
          <tr>
            <th>No.</th>
            <th>ID</th>
            <th>Name</th>
            <th>Category ID</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Measure Unit</th>
            <th>Expiry Date</th> {/* Added Expiry Date column */}
            <th>Status</th> {/* Added Status column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category_id}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.measure_unit}</td>
              <td>{product.expiry_date}</td> {/* Display Expiry Date */}
              <td>{isExpired(product.expiry_date) ? 'Expired' : 'Valid'}</td> {/* Display product status */}
              <td>
                <Button variant="warning" onClick={() => handleEditProduct(index)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteProduct(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showError && <Alert variant="danger">Please fill in all fields.</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* ID field is removed from the form */}
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductCategoryID">
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category ID"
                value={newProduct.category_id}
                onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product quantity"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductMeasureUnit">
              <Form.Label>Measure Unit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter measure unit"
                value={newProduct.measure_unit}
                onChange={(e) => setNewProduct({ ...newProduct, measure_unit: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductExpiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter expiry date"
                value={newProduct.expiry_date}
                onChange={(e) => setNewProduct({ ...newProduct, expiry_date: e.target.value })}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {editIndex !== null ? 'Save Changes' : 'Add Product'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;
