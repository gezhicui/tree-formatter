if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/tree-formatter.min.js');
} else {
  module.exports = require('./dist/tree-formatter.js');
}