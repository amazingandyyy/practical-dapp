const routes = require('next-routes')();

routes.add('/campaigns', '/')
routes.add('/campaigns/new', '/campaigns/new')
routes.add('/campaigns/:address', '/campaigns/details')
routes.add('/campaigns/:address/requests', '/campaigns/requests/index')
routes.add('/campaigns/:address/requests/new', '/campaigns/requests/new')

module.exports = routes