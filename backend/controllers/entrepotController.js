// Mock data storage (in a real app, this would be a database)
let items = [
  { id: 1, name: 'Product A', description: 'High-quality product A', price: 99.99, category: 'Electronics' },
  { id: 2, name: 'Product B', description: 'Premium product B', price: 149.99, category: 'Clothing' },
  { id: 3, name: 'Product C', description: 'Essential product C', price: 49.99, category: 'Home' }
];

let nextId = 4;

// Get all items
const getAllItems = (req, res) => {
  try {
    const { category, search } = req.query;
    let filteredItems = items;

    if (category) {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json({
      success: true,
      data: filteredItems,
      count: filteredItems.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch items'
    });
  }
};

// Get item by ID
const getItemById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch item'
    });
  }
};

// Create new item
const createItem = (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        error: 'All fields (name, description, price, category) are required'
      });
    }

    const newItem = {
      id: nextId++,
      name,
      description,
      price: parseFloat(price),
      category
    };

    items.push(newItem);

    res.status(201).json({
      success: true,
      data: newItem,
      message: 'Item created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create item'
    });
  }
};

// Update item
const updateItem = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    const { name, description, price, category } = req.body;
    const updatedItem = {
      ...items[itemIndex],
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(category && { category })
    };

    items[itemIndex] = updatedItem;

    res.json({
      success: true,
      data: updatedItem,
      message: 'Item updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update item'
    });
  }
};

// Delete item
const deleteItem = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    const deletedItem = items.splice(itemIndex, 1)[0];

    res.json({
      success: true,
      data: deletedItem,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete item'
    });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};