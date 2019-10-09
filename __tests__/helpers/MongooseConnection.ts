import '../../src/bootstrap'

import mongoose from 'mongoose'

class MongooseConnection {
  async connect (testSuiteName: string): Promise<void> {
    mongoose.connect(`${process.env.MONGO_URI}-${testSuiteName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }, async (error) => {
      if (error) {
        throw error
      }
    })
  }

  async disconnect (): Promise<void> {
    await mongoose.connection.close()
  }

  async truncate (): Promise<void> {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collection of collections) {
      await mongoose.connection.collections[collection].deleteMany({})
    }
  }
}

export default new MongooseConnection()
