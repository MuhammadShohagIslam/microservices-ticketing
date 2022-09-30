import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    /*
        => toJSON, inside of here, we are going to define a 
        set of properties that are going to help 
        Mongoose take our document and turn it into JSON

        => We get this object we can pass in a set of different customization options that describe
        how to turn our document into JSON.

        => transform(doc, ret): which to use to how our user document gets turned into JSON.
          => doc: this is going to be the actual document or the actual user instance that we are turning into JSON.
          => ret: is short for returned object or
          something similar to that. and is going to be
          just the properties that are tied to our user document.
            => If we want to make any further changes to
            how mongoose is going to turn thing into
            JSON, we are going to modify that ret object in a place
    */
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

/*
  => This is middleware function implement by mongoose,
  any time we attempt to save a document to our database, 
  we are going to execute this function right way
  => done: mongoose does not really have great support out of the box for async, 
  await syntax instead to handle any kind of asynchronous code that we want to 
  run inside this little callback function,we can 'done argument, 
  So we are responsible for calling 'done' once we have done all the work we need to do inside of here.

  => this: whenever we put together a middleware function, 
  we get access to the document that going to be saved, 
  so the actual user that we are trying to persist to the database 
  as this inside of this function. If we used arrow function right here, 
  then the value of this inside function would be overridden 
  and would be actually instead equal to the context of this entire file as 
  opposed to our user document not what we want, that is way normal function instead of arrow function.

  => this.get(): that's going to get the users password of the document and we will pass into hashed
  => this.set(): we just updated the password.
*/
userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
