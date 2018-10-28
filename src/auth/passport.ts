import * as passport from "passport";
import * as passportLocal from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import { User, IUserModel } from "../models/User";
import { IUser } from "../models/interfaces/IUser";
require("dotenv").config();

const LocalStrategy = passportLocal.Strategy;

const localOpts = {
    usernameField: "username",
    passwordField: "password"
};

const localLogin = new LocalStrategy(localOpts, async (username, password, done) => {
    try {
        const user: IUserModel = await User.findOne({ username }).exec();

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

// Jwt strategy
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.JWT_SECRET,
  };
  
  const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
      //Identify user by ID
      const user = await User.findById(payload._id);
  
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  });

passport.use(localLogin);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate("local", { session: false });
export const authJwt = passport.authenticate("jwt", { session: false });