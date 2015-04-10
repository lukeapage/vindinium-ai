module.exports = {
    'test': ['clean', 'ts', 'env:coverage', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport'],
    'test-run': ['clean', 'ts', 'shell:test-run'],
    'run': ['clean', 'ts', 'shell:run']
};