const { createServer } = require('http');
const next = require('next');
const PORT = process.env.PORT || 3000;

const app = next({
  dev: process.env. NODE_ENV!== 'production'
})

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(PORT, (err)=>{
    if(err) throw err;
    console.log(`Ready on port ${PORT}`);
  })
})