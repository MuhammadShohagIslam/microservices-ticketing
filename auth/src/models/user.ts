import { Schema, model, Model } from "mongoose";

// An interface that describes the properties 
// that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

/*
    => An interface that describes the properties
    that a User Model has
    => That describes what the entire collection of 
    users or at least methods associated with the user
    model
*/
interface UserModel extends Model<UserDoc>{
    build(attrs:UserAttrs): UserDoc
}

// An interface that describes the properties
// that a user document has
interface UserDoc extends Document{
    email: string,
    password: string
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});


userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = model<UserDoc, UserModel>("Users", userSchema);

// one way to fix type in new user
// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs)
// }

// buildUser({
//     email: "a",
//     password: "1"
// })

export { User };
