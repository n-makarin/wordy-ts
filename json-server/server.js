const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./json-server/db.json')
const middlewares = jsonServer.defaults()
const routes = require('./routes.json')

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// server.use((req, res, next) => {
  // if (req.query.user_id) { // add your authorization logic here
  //   next() // continue to JSON Server router
  // } else {
  //   console.log(req.query.user_id)
  //   res.sendStatus(401)
  // }
// })


// Add custom routes
server.use(jsonServer.rewriter(routes.list))

server.use(router)

server.listen(8000, () => {
  console.log('JSON Server is running')
})