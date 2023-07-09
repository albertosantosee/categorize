const natural = require('natural');

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

  const classifier = new natural.BayesClassifier();
  for (const [category, keywords] of Object.entries(categories)) {
    classifier.addDocument(keywords.join(' '), category);
  }
  classifier.train();

  const category = classifier.classify(description);

  return category;
}

// Example usage
const description = "12V 5A Power Supply Led Strip Light 120V to 12V Transformer Input with 5.5x2.1mm 60W 12V AC DC";
const itemCategory = categorizeItem(description);
console.log(itemCategory);


module.exports = categorizeItem
