import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

const dbHandler = {
  /**
   * Connect to the in-memory database.
   */
  connect: async (): Promise<void> => {
    if (mongoose.connection.readyState >= 1) return;

    const uri = await mongod.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    };
    await mongoose.connect(uri, mongooseOpts);
  },

  /**
   * Drop database, close the connection and stop mongod.
   */
  closeDatabase: async (): Promise<void> => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  },

  /**
   * Remove all the data for all db collections.
   */
  clearDatabase: async (): Promise<void> => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  },
};

export default dbHandler;
