import React, { useState } from 'react';
import './InventoryOutput.css';

const ProductInventory = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ id: '', name: '', category: '', price: '', quantity: '', supplier: '', measure_unit: '' });
  const [inventory, setInventory] = useState({ productId: '', quantity: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleChangeInventory = (e) => {
    const { name, value } = e.target;
    setInventory({
      ...inventory,
      [name]: value
    });
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => (p.id === product.id ? product : p)));
    } else {
      setProducts([...products, { ...product, id: Date.now().toString() }]);
    }
    setProduct({ id: '', name: '', category: '', price: '', quantity: '', supplier: '', measure_unit: '' });
    setIsEditing(false);
  };

  const handleSubmitInventory = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p => {
      if (p.id === inventory.productId) {
        return { ...p, quantity: parseInt(p.quantity) + parseInt(inventory.quantity) };
      }
      return p;
    });
    setProducts(updatedProducts);
    setInventory({ productId: '', quantity: '' });
    setMessage('Successfully added inventory');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  const handleEdit = (product) => {
    setProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="product-container">
      <h1>Product Management</h1>
      <div className='row'>
        <form className="product-form" onSubmit={handleSubmitProduct}>
          <div>
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={product.name} onChange={handleChangeProduct} required />
          </div>
          <div>
            <label className="form-label">Category</label>
            <select className="form-select" name="category" value={product.category} onChange={handleChangeProduct} required>
              <option value="">Select category...</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Toys">Toys</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" name="price" value={product.price} onChange={handleChangeProduct} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input type="number" className="form-control" name="quantity" value={product.quantity} onChange={handleChangeProduct} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Supplier</label>
            <input type="text" className="form-control" name="supplier" value={product.supplier} onChange={handleChangeProduct} />
          </div>
          <div className="mb-3">
            <label className="form-label">Measure</label>
            <input type="text" className="form-control" name="measure_unit" value={product.measure_unit} onChange={handleChangeProduct} />
          </div>
          <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Create'}</button>
        </form>
      </div>
      <div>
        <h1>Inventory Input</h1>
        <form className="inventory-form" onSubmit={handleSubmitInventory}>
          <div>
            <label className="form-label">Product</label>
            <select className="form-select" name="productId" value={inventory.productId} onChange={handleChangeInventory} required>
              <option value="">Select product...</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input type="number" className="form-control" name="quantity" value={inventory.quantity} onChange={handleChangeInventory} required />
          </div>
          <button type="submit" className="btn btn-success">Add Inventory</button>
        </form>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>
      <div>
        <h1>List of Products</h1>
      </div>
      <div className="product-list mt-4">
        {products.map((product) => (
          <div key={product.id} className="product-item border p-3 mb-3">
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Supplier: {product.supplier}</p>
            <p>Measure: {product.measure_unit}</p>
            <button className="btn btn-warning me-2" onClick={() => handleEdit(product)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInventory;
