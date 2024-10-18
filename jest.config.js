const path = require('path');

module.exports = {
    testTimeout: 30000,
    testEnvironment: 'node',
    reporters: [
        'default',
        ['jest-html-reporters', {
            publicPath: './report',
            filename: `report-${new Date().toISOString().replace(/:/g, '-')}.html`,
            expand: true,
        }]
    ],
};
