import React, { useState } from 'react';
import { Button, Modal, Form, Table, Alert } from 'react-bootstrap';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    category_id: '',
    supplier: '',
    measure_unit: '',
    image: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showError, setShowError] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    resetNewProduct();
  };

  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewProduct(null);
  };

  const handleShowViewModal = (product) => {
    setViewProduct(product);
    setShowViewModal(true);
  };

  const resetNewProduct = () => {
    setNewProduct({
      name: '',
      category_id: '',
      supplier: '',
      measure_unit: '',
      image: '',
    });
  };

  const generateId = () => {
    const paddedId = String(nextId).padStart(4, '0');
    setNextId(nextId + 1);
    return paddedId;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, category_id, supplier, measure_unit, image } = newProduct;

    if (!name || !category_id || !supplier || !measure_unit || !image) {
      setShowError(true);
      return;
    }

    const id = generateId();
    const updatedProduct = { ...newProduct, id };

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
    Object.keys(product).some(key =>
      product[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className='longfix1'>
      <h1>Product List</h1>
      <div className='row w-60'>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button className="button-add longbuttonfix2" style={{ marginLeft: '140px' }} variant="primary" onClick={handleShowAddModal}>
            Add Product
          </Button>
          <Form.Control className='longfixbutton3'
            type="text"
            placeholder="Search"
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
            <th>Supplier</th>
            <th>Measure Unit</th>
            <th>Image</th>
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
              <td>{product.supplier}</td>
              <td>{product.measure_unit}</td>
              <td><img src={product.image} alt={product.name} style={{ width: '50px' }} /></td>
              <td>
                <div className="">
                  <div className='row w-60'>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="info" onClick={() => handleShowViewModal(product)}>View</Button>
                      <Button variant="warning" onClick={() => handleEditProduct(index)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteProduct(index)}>Delete</Button>{' '}
                    </div>
                  </div>
                </div>
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
            <Form.Group controlId="formProductSupplier">
              <Form.Label>Supplier</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter supplier"
                value={newProduct.supplier}
                onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
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
            <Form.Group controlId="formProductImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
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

      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewProduct && (
            <div>
              <p><strong>ID:</strong> {viewProduct.id}</p>
              <p><strong>Name:</strong> {viewProduct.name}</p>
              <p><strong>Category ID:</strong> {viewProduct.category_id}</p>
              <p><strong>Supplier:</strong> {viewProduct.supplier}</p>
              <p><strong>Measure Unit:</strong> {viewProduct.measure_unit}</p>
              <p><strong>Image:</strong> <img src={viewProduct.image} alt={viewProduct.name} style={{ width: '100px' }} /></p>
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

export default ProductList;
