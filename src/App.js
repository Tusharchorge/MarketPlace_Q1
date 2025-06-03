 import './App.css';
import React from 'react';

function App() {
  const [items, setItems] = React.useState([]);
  const [newItem, setNewItem] = React.useState({
    item_name: '',
    category: '',
    quantity: '',
    price: '',
    is_published: false,
  });

  const [filter, setFilter] = React.useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isAuthenticated) {
      setError('You must be logged in to add items.');
      return;
    }

    const { item_name, category, quantity, price, is_published } = newItem;
    if (!item_name || !category || !quantity || !price) {
      setError('All fields are required.');
      return;
    }

    const itemData = {
      id: Date.now(),  
      user_id: 101,   
      item_name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      is_published, 
    };

    try {
      const res = await fetch('http://localhost:5000/api/add-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });

      const data = await res.json();
      if (res.ok) {
        setItems((prev) => [...prev, itemData]);
        setSuccess('Item added successfully!');
        setNewItem({
          item_name: '',
          category: '',
          quantity: '',
          price: '',
          is_published: false,
        });
      } else {
        setError(data.error || 'Failed to add item.');
      }
    } catch (err) {
      setError('Error connecting to server.');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = !filter.category || item.category === filter.category;
    const matchesPrice =
      (!filter.minPrice || item.price >= filter.minPrice) &&
      (!filter.maxPrice || item.price <= filter.maxPrice);
    return item.is_published === true && matchesCategory && matchesPrice;
  });

  return (
    <div className="App">
      <h1>My Store</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>

      <section>
        <h2>Add Item to My Store</h2>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            name="item_name"
            placeholder="Item Name"
            value={newItem.item_name}
            onChange={handleInputChange}
          />
          <select name="category" value={newItem.category} onChange={handleInputChange}>
            <option value="">Select Category</option>
            <option value="oil">Oil</option>
            <option value="tyre">Tyre</option>
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleInputChange}
          />
          <label>
            <input
              type="checkbox"
              name="is_published"
              checked={newItem.is_published}
              onChange={handleInputChange}
            />
            Publish to Marketplace
          </label>
          <button type="submit">Add Item</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </section>

      <section>
        <h2>Filter Marketplace Items</h2>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={filter.category}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filter.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filter.maxPrice}
          onChange={handleFilterChange}
        />
      </section>

      <section>
        <h2>Marketplace Items</h2>
        <div>
          {filteredItems.length === 0 ? (
            <p>No items found.</p>
          ) : (
            filteredItems.map((item, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                <h3>{item.item_name}</h3>
                <p>Category: {item.category}</p>
                <p>Quantity: {item.quantity} | Price: ${item.price}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
