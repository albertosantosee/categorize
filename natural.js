const natural = require('natural');
const categories = require('./categories');

function categorizeItem(description) {
  const classifier = new natural.BayesClassifier();
  for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      classifier.addDocument(keyword, category);
    }
  }
  classifier.train();

  const itemProbabilities = classifier.getClassifications(description);
  itemProbabilities.sort((a, b) => b.value - a.value); // Sort by probability in descending order

  const topCategory = itemProbabilities[0].label; // Get the top category
  const threshold = 0.1; // Adjust the threshold as needed

  if (topCategory === 'none' || itemProbabilities[0].value < threshold) {
    // Check if the description contains any toy-related keywords
    const toyKeywords = categories.toys;
    const hasToyKeyword = toyKeywords.some((keyword) => description.toLowerCase().includes(keyword));
    if (hasToyKeyword) {
      return 'toys'; // Return "toys" category if the description contains toy-related keywords
    }
    return 'miscellaneous'; // Return "miscellaneous" category for unrecognized or low probability inputs
  }

  return topCategory;
}

// Example usage
const description = "Wooden Montessori Toys for Toddlers, Carrot Harvest, Shapes Sorting &Matching, Stacking...";
const itemCategory = categorizeItem(description);
console.log(itemCategory);

module.exports = categorizeItem;
