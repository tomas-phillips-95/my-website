import * as mongoDB from "mongodb";

const DB_CONN_STRING = `mongodb+srv://tomasphillips95:${process.env.MONGO_DB_PASSWORD}@my-website.tlnrioy.mongodb.net/?retryWrites=true&w=majority`;
const DB_NAME = "my-website";

let isConnected = false;

export async function connect() {
  if (!isConnected) {
    isConnected = true;
    await client.connect();
  }
}

export function close() {
  return client.close();
}

export const client: mongoDB.MongoClient = new mongoDB.MongoClient(
  DB_CONN_STRING
);

export async function getCollection(collectionName: string) {
  return client.db(DB_NAME).collection(collectionName);
}
