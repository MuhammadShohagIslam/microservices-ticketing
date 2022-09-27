import { Schema, model, Model } from "mongoose";

// An interface that describes the properties 
// that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends Model<UserAttrs>{
    build(attrs:UserAttrs): UserAttrs
}
const userSchema = new Schema<UserAttrs, UserModel>({
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

const User = model<UserAttrs, UserModel>("Users", userSchema);

User.build({
    email: "a",
    password:"22"
})


// one way to fix type in new user
// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs)
// }

// buildUser({
//     email: "a",
//     password: "1"
// })

export { User };
