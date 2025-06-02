
import './App.css';
import React from 'react';


function App() {
  const [items, setItems] = React.useState([]);
  const [newItem, setNewItem] = React.useState({
    itemName: '',
    category: '',
    quantity: '',
    price: '',
    isPublishedToMarketplace: false,
  });

  const [filter, setFilter] = React.useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const [connectRequests, setConnectRequests] = React.useState([]);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState(''); // BO, EO, or MP
  const [error, setError] = React.useState('');


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

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('You must be logged in to add items.');
      return;
    }

    if (!newItem.itemName || !newItem.category || !newItem.quantity || !newItem.price) {
      setError('All fields are required.');
      return;
    }

    setItems((prev) => [...prev, newItem]);
    setNewItem({
      itemName: '',
      category: '',
      quantity: '',
      price: '',
      isPublishedToMarketplace: false,
    });
    setError('');
  };
  const handleConnectRequest = (item) => {
   
  };
  const filteredItems = items.filter((item) => {
    const matchesCategory = !filter.category || item.category === filter.category;
    const matchesPrice = (!filter.minPrice || item.price >= filter.minPrice) && (!filter.maxPrice || item.price <= filter.maxPrice);
    return matchesCategory && matchesPrice;
  });

  return (
      <div>
        <h1>My Store</h1>
        <h2>Add Item to My Store</h2>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            value={newItem.itemName}
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
              name="isPublishedToMarketplace"
              checked={newItem.isPublishedToMarketplace}
              onChange={handleInputChange}
            />
            Publish to Marketplace
          </label>
          <button type="submit">Add Item</button>
          {error && <p className="error">{error}</p>}
          </form>

        <h2>Marketplace Items</h2>
        <div>
          {filteredItems.map((item, index) => (
            <div key={index}>
              <h3>{item.itemName}</h3>
              <p>Category: {item.category}</p>
              <p>Quantity: {item.quantity} | Price: ${item.price}</p>
              <button onClick={() => handleConnectRequest(item)}>Connect</button>
            </div>
          ))}
        </div>
      </div>
  )
}

      






  

export default App;
