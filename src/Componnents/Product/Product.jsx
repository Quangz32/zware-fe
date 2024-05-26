// import React, { useState } from 'react';
// import './Product.css';

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [product, setProduct] = useState({ id: '', name: '', category: '', price: '', quantity: '' });
//   const [isEditing, setIsEditing] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({
//       ...product,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       setProducts(products.map(p => (p.id === product.id ? product : p)));
//     } else {
//       setProducts([...products, { ...product, id: Date.now().toString() }]);
//     }
//     setProduct({ id: '', name: '', category: '', price: '', quantity: '' });
//     setIsEditing(false);
//   };

//   const handleEdit = (product) => {
//     setProduct(product);
//     setIsEditing(true);
//   };

//   const handleDelete = (productId) => {
//     setProducts(products.filter(product => product.id !== productId));
//   };

//   return (
//     <div className="product-container">
//       <h1>Product Management</h1>
//       <form className="product-form" onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input type="text" name="name" value={product.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Category</label>
//           <select name="category" value={product.category} onChange={handleChange} required>
//             <option value="">Select category...</option>
//             <option value="Electronics">Electronics</option>
//             <option value="Clothing">Clothing</option>
//             <option value="Books">Books</option>
//             <option value="Toys">Toys</option>
//           </select>
//         </div>
//         <div>
//           <label>Price</label>
//           <input type="number" name="price" value={product.price} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Quantity</label>
//           <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
//         </div>
//         <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
//       </form>
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product.id} className="product-item">
//             <h2>{product.name}</h2>
//             <p>Category: {product.category}</p>
//             <p>Price: ${product.price}</p>
//             <p>Quantity: {product.quantity}</p>
//             <button onClick={() => handleEdit(product)}>Edit</button>
//             <button onClick={() => handleDelete(product.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Product;
import React, { useState } from 'react';
import './Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ id: '', name: '', category: '', price: '', quantity: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => (p.id === product.id ? product : p)));
    } else {
      setProducts([...products, { ...product, id: Date.now().toString() }]);
    }
    setProduct({ id: '', name: '', category: '', price: '', quantity: '' });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="container co" >
      <h1 className="mt-4">Product Management</h1>
      <form className="product-form mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select category...</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input type="number" className="form-control" name="quantity" value={product.quantity} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Create'}</button>
      </form>
      <div className="product-list mt-4">
        {products.map((product) => (
          <div key={product.id} className="product-item border p-3 mb-3">
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button className="btn btn-warning me-2" onClick={() => handleEdit(product)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
