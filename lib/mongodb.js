import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let client;
let clientPromise;

if (!global._mongoClient) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Cache the actual MongoClient instance (not the resolved connection)
  global._mongoClient = client;
  clientPromise = client.connect();
  global._mongoClientPromise = clientPromise;
} else {
  client = global._mongoClient;
  clientPromise = global._mongoClientPromise;
}

export default clientPromise;
