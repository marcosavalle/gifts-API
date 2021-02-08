import 'babel-polyfill'
import http from 'http'
import Mongo from './services/mongo-service'
import { ApolloServer, PubSub } from 'apollo-server-express'
import { typeDefs } from './graphql/schema'
import { resolvers } from './controllers/graphql/resolvers'
import { authMiddleware } from './middlewares/authentication.middleware'
import { app } from './app'

const port = process.env.PORT || process.env.MELI_REGALOS_API_PORT
const dev = process.env.DEVELOPMENT === 'true'

export const pubsub = new PubSub()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: dev,
  playground: dev,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context
    } else {
      const { user, auth } = await authMiddleware(req)
      return { user, auth, pubsub }
    }
  }
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

Mongo.connect()
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`Meli-regalos API running at port ${port}...`)
      console.log(`Subscriptions ready at ws://url${server.subscriptionsPath}`)
    })

    process.on('uncaughtException', err => {
      console.error(err, 'Uncaught Exception thrown')
      process.exit(1)
    })

    process.on('SIGTERM', () => {
      httpServer.off()
    })
  })
  .catch(err => {
    console.log(err)
  })
