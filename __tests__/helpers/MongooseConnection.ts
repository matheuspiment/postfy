import '../../src/bootstrap'

import mongoose from 'mongoose'

class MongooseConnection {
  async connect (): Promise<void> {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }, async (error) => {
      if (error) {
        throw error
      }

      const collections = Object.keys(mongoose.connection.collections)
      for (const collection of collections) {
        await mongoose.connection.collections[collection].deleteMany({})
      }
    })
  }

  async disconnect (): Promise<void> {
    await mongoose.connection.close()
  }
}

export default new MongooseConnection()
