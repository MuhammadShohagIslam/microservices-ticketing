/*
  mongodb-memory-server: that is the copy of MongoDB 
  that is going to be running in memory.The reason we 
  are running a copy of mongo in memory is that we can 
  easily test multiple database at the same time.
*/

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  function signin(): Promise<string[]>;
}

let mongo: any;
// that function is going to run before all of our tests start to be executed.
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// that function is going to run before each of our tests start to be executed.
beforeEach(async () => {
  // all different collection of the databse
  const collections = await mongoose.connection.db.collections();
  /* 
    before each test starts,we are going to reach into
    this MongoDB database and we are going to delete or 
    essentially rest all the data inside there.
  */

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
/*
  that function is going to run after all of our tests
  which stop mongo server and mongoose connection close()
*/
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
