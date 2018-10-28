import * as passport from "passport";
import * as passportLocal from "passport-local";

import { User } from "../models/User";
import { IUser } from "../models/interfaces/IUser";

const LocalStrategy = passportLocal.Strategy;

const localOpts = {
    usernameField: "username",
    passwordField: "password"
};

const localLogin = new LocalStrategy(localOpts, async (username, password, done) => {
    try {
        const user: IUser = await User.findOne({ username }).exec();

        if (!user) {
            return done(null, false, { message: "Incorrect username." });
        } else if (!await user.isValidPassword(password, user)) {
            return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);

    } catch (error) {
        return done(error, false);
    }
});

passport.use(localLogin);

export const authLocal = passport.authenticate("local", { session: false });
