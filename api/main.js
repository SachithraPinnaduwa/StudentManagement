import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import { connectToDatabase,disconnectFromDatabase } from './mongoconnect.js'; 
import cookieSession from 'cookie-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import router from './routes/auth.js';
import adminRouter from './routes/admins.js';
import studentRouter from './routes/students.js';
dotenv.config();

const app = express(); 
const PORT = 8080 || process.env.PORT ; 

app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));    
app.use(
  cookieSession({
    name:'session',
    keys: ['cyberwolve'],
    maxAge: 24 * 60 * 60 * 1000,
  })
)


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,
callbackURL: '/auth/google/callback',
scope: ['email', 'profile']
}, (accessToken, refreshToken, profile, callback) => {
callback(null, profile);
}));



passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
  });


app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', router);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);



app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
  await  connectToDatabase();
  console.log('Connected to MongoDB database');
});

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await disconnectFromDatabase();
  process.exit();
});

export default app;