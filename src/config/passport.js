import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findByCredentials(email, password);
    return done(null, user);
  } catch (error) {
    return done(null, false, { message: error.message });
  }
}));
