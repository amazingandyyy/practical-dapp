const routes = require('next-routes')();

routes.add('/campaigns/new', '/campaigns/new')
routes.add('/campaigns/:address', '/campaigns/details')

module.exports = routes