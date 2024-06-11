import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import MyAxios from '../../Utils/MyAxios';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
  });
  const [selectedCategory, setSelectedCategory] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await MyAxios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setEditIndex(null);
    setError('');
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
    setError('');
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setDeleteIndex(null);
  };

  const validateCategory = (category) => {
    if (!category.name) {
      return 'Please fill in the category name.';
    }
    return '';
  };

  const handleAddCategory = async () => {
    const validationError = validateCategory(newCategory);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      if (editIndex !== null) {
        const categoryToEdit = categories[editIndex];
        await MyAxios.put(`/categories/${categoryToEdit.id}`, {
          name: newCategory.name,
        });
      } else {
        await MyAxios.post('/categories', newCategory);
      }
      setNewCategory({
        name: '',
      });
      fetchData();
      handleCloseAddModal();
    } catch (error) {
      console.error('Error adding category:', error);
      setError('An error occurred while adding the category.');
    }
  };

  const handleDeleteCategory = async () => {
    if (deleteIndex !== null) {
      try {
        await MyAxios.delete(`/categories/${categories[deleteIndex].id}`);
        fetchData();
        handleCloseConfirmModal();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleEditCategory = (index) => {
    const categoryToEdit = categories[index];
    setNewCategory({ ...categoryToEdit });
    setEditIndex(index);
    handleShowAddModal();
  };

  const handleViewCategory = (index) => {
    const categoryToView = categories[index];
    setSelectedCategory(categoryToView);
    setShowViewModal(true);
  };

  const handleShowConfirmModal = (index) => {
    setDeleteIndex(index);
    setShowConfirmModal(true);
  };

  const filteredCategories = categories.filter((category) =>
    Object.values(category).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className='longfix1 '>
      <h1>Category Management</h1>
      <div className='row w-60'>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button className="button-add longbuttonfix2" style={{ marginLeft: '140px' }} variant="primary" onClick={handleShowAddModal}>
            Add Category
          </Button>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{ marginRight: '114px' }}
          />
        </div>
      </div>
      {filteredCategories.length > 0 ? (
        <table className="table text-center">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td > 
                    <div className=' row w-60'>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button variant="info" onClick={() => handleViewCategory(index)}>View</Button>{' '}
                  <Button variant="warning" onClick={() => handleEditCategory(index)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleShowConfirmModal(index)}>Delete</Button>
                  </div>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No category found.</p>
      )}

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            {editIndex !== null ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>ID:</strong> {selectedCategory.id}</p>
          <p><strong>Name:</strong> {selectedCategory.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this category?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCategory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryManager;
