module.exports = {
    'test': ['ts', 'env:coverage', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport']
};