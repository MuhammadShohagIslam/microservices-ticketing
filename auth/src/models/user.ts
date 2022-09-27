import { Schema, model } from "mongoose";

interface UserAttrs {
    email: string;
    password: string;
}
const userSchema = new Schema<UserAttrs>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = model("Users", userSchema);


// one way to fix type in new user
const buildUser = (attrs: UserAttrs) => {
    return new User(attrs)
}

buildUser({
    email: "a",
    password: "1"
})

export { User };
