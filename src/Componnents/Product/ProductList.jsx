import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Alert } from 'react-bootstrap';
import './ProductList.css';
import MyAxios from '../../Utils/MyAxios';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    MyAxios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    resetNewProduct();
    setShowError(false);
    setErrorMessage('');
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
      id: '',
      name: '',
      category_id: '',
      supplier: '',
      measure_unit: '',
      image: '',
    });
  };

  const generateId = () => {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  };

  const validateProduct = (product) => {
    if (!product.name || !product.category_id || !product.supplier || !product.measure_unit || !product.image) {
      setErrorMessage('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, category_id, supplier, measure_unit, image } = newProduct;

    if (!validateProduct(newProduct)) {
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
      setSuccessMessage('Product updated successfully!');
    } else {
      setProducts([...products, updatedProduct]);
      setSuccessMessage('Product added successfully!');
    }

    setShowSuccess(true);
    setShowError(false);
    handleCloseAddModal();
  };

  const handleEditProduct = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
    handleShowAddModal();
  };

  const handleDeleteProduct = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = () => {
    const updatedProducts = products.filter((_, i) => i !== deleteIndex);
    setProducts(updatedProducts);
    setSuccessMessage('Product deleted successfully!');
    setShowSuccess(true);
    setShowDeleteModal(false);
    setDeleteIndex(null);
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
      {showError && <Alert variant="danger" onClose={() => setShowError(false)} dismissible>{errorMessage}</Alert>}
      {showSuccess && <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>{successMessage}</Alert>}
      {filteredProducts.length > 0 ? (
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
                  <div className='row w-60'>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Button variant="info" onClick={() => handleShowViewModal(product)}>View</Button>
                      <Button variant="warning" className="me-2" onClick={() => handleEditProduct(index)}>Edit</Button>
                      <Button variant="danger" className="me-2" onClick={() => handleDeleteProduct(index)}>Delete</Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p style={{ color: 'white' }}>No products found.</p>
      )}

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <div className="d-flex justify-content-start w-60">
                <Button variant="secondary mt-2" onClick={handleCloseAddModal}>
                  Close
                </Button>
                <Button variant="btn btn-primary mt-2" type="submit">
                  {editIndex !== null ? 'Save Changes' : 'Add'}
                </Button>
              </div>
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
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this product?</p>
        </Modal.Body>
        <Modal.Footer>
        <div className='row w-60'>
        <div className="d-flex justify-content-between align-items-center mb-3">

          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteProduct}>
            Delete
          </Button>
          </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
