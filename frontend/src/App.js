import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/entrepot';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const response = await fetch(`${API_BASE_URL}?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setItems(data.data);
      } else {
        setError('Failed to fetch items');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  // Create new item
  const createItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setItems([...items, data.data]);
        setFormData({ name: '', description: '', price: '', category: '' });
        setShowForm(false);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to create item');
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setItems(items.filter(item => item.id !== id));
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  useEffect(() => {
    fetchItems();
  }, [searchTerm, selectedCategory]);

  const categories = [...new Set(items.map(item => item.category))];

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏪 Entrepot Service</h1>
        <p>Manage your inventory with ease</p>
      </header>

      <main className="main-content">
        {/* Controls */}
        <div className="controls">
          <div className="search-controls">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="add-button"
          >
            {showForm ? '✕ Cancel' : '+ Add Item'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="close-error">✕</button>
          </div>
        )}

        {/* Add Item Form */}
        {showForm && (
          <div className="form-container">
            <form onSubmit={createItem} className="item-form">
              <h3>Add New Item</h3>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Item name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
              <button type="submit" className="submit-button">Add Item</button>
            </form>
          </div>
        )}

        {/* Items List */}
        {loading ? (
          <div className="loading">Loading items...</div>
        ) : (
          <div className="items-grid">
            {items.length === 0 ? (
              <div className="no-items">
                <h3>No items found</h3>
                <p>Add some items to get started!</p>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="item-card">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <span className="item-price">${item.price}</span>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <div className="item-footer">
                    <span className="item-category">{item.category}</span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="delete-button"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Entrepot Service - Built with React & Express</p>
      </footer>
    </div>
  );
}

export default App;
