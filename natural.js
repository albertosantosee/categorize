const natural = require('natural');
const categories = require('./categories');

function categorizeItem(description) {
  const classifier = new natural.BayesClassifier();
  for (const [category, keywords] of Object.entries(categories)) {
    classifier.addDocument(keywords.join(' '), category);
  }
  classifier.train();

  const matchedCategory = classifier.classify(description);
  const isMiscellaneous = Object.values(categories).every((keywords) => !keywords.includes(matchedCategory));

  return isMiscellaneous ? 'miscellaneous' : matchedCategory;
}

// Example usage
const description = "12V 5A Power Supply Led Strip Light 120V to 12V Transformer Input with 5.5x2.1mm 60W 12V AC DC";
const itemCategory = categorizeItem(description);
console.log(itemCategory);

module.exports = categorizeItem;
