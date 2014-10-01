module.exports = process.env.tsort_COV
  ? require('./lib-cov/tsort')
  : require('./lib/tsort');
