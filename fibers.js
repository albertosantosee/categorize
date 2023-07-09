const fibers = require('fibers');

function categorizeItem(description) {
  const categories = {
    electronics: ['electronics', 'tv', 'computer', 'camera', 'phone', 'tablet'],
    home: ['home', 'furniture', 'kitchen', 'bedroom', 'bathroom', 'decor'],
    clothing: ['clothing', 'apparel', 'shoes', 'accessories', 'fashion'],
    beauty: ['beauty', 'skincare', 'makeup', 'hair', 'fragrance'],
    sports: ['sports', 'outdoors', 'fitness', 'exercise', 'equipment'],
    books: ['books', 'literature', 'novel', 'magazine', 'educational'],
    toys: ['toys', 'games', 'play', 'kids', 'children'],
    automotive: ['automotive', 'car', 'vehicle', 'parts', 'accessories'],
    groceries: ['groceries', 'food', 'beverages', 'snacks', 'pantry'],
    // Add more categories as needed
  };

  function classifySync(description) {
    for (const [category, keywords] of Object.entries(categories)) {
      const match = keywords.some(keyword => description.toLowerCase().includes(keyword));
      if (match) {
        return category;
      }
    }
    return null;
  }

  const result = fibers(description, classifySync);
  return result;
}

// Example usage
const description = "12V 5A Power Supply Led Strip Light 120V to 12V Transformer Input with 5.5x2.1mm 60W 12V AC DC";
const itemCategory = categorizeItem(description);
console.log(itemCategory);

module.exports = categorizeItem