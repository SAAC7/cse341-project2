import passport from 'passport';
import { Strategy as GitHubStrategy  } from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    
}, (accessToken, refreshToken, profile, done) => {
        // There can search or save the user on the db if is requieres.
        return done(null, profile);
}));

// Save the user data in the session
passport.serializeUser((user, done) => {
        done(null, user);
    
});

// Recover the user data from the session 
passport.deserializeUser((user, done) => {
    done(null, user);
    });

export default passport;
