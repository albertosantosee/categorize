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

  const tfidf = new natural.TfIdf();

  // Calculate the TF-IDF scores for the pre-defined categories
  for (const [category, keywords] of Object.entries(categories)) {
    tfidf.addDocument(keywords.join(' '));
  }

  // Calculate the TF-IDF scores for the input description
  tfidf.addDocument(description);

  const itemCategory = tfidf.listTerms(1).reduce((maxCategory, term) => {
    const termTFIDF = tfidf.tfidf(term.term, 1);
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.includes(term.term) && termTFIDF > tfidf.tfidf(maxCategory.term, maxCategory.document)) {
        maxCategory.term = term.term;
        maxCategory.document = 1;
        maxCategory.category = category;
      }
    }
    return maxCategory;
  }, { term: '', document: 0, category: null }).category;

  return itemCategory;
}

// Example usage
const description = "12V 5A Power Supply Led Strip Light 120V to 12V Transformer Input with 5.5x2.1mm 60W 12V AC DC";
const itemCategory = categorizeItem(description);
console.log(itemCategory);



module.exports = categorizeItem
