require('dotenv').config();

// Library Setup
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const passport = require('passport');
const cors = require('cors');

// routes 
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

// cors Option
const corsOption = {
    origin: (origin, callback) => {
        // List of allowed origins
        const allowedOrigins = [
            'http://localhost:5173', // Vite
            'http://localhost:5000', // CRA
            process.env.CLIENT_URL,  // Production client URL
        ];

        // Check if the request origin is in the allowed origins list
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Block the request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};


const app = express();

// Global Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json()); // Parse JSON bodies (redundant with bodyParser.json())
app.use(cookieParser()); // Parse cookies
app.use(cors(corsOption)); // Enable CORS
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve static files




// Passport JWT Strategy
const {Strategy:JwtStrategy,ExtractJwt} = require('passport-jwt');
const { connectDB } = require('./config/connect');
const cookieExtractor = (req) => {
  console.log('Hello');
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token; 
  }
  console.log(token)
  return token;
};
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.SECRET_KEY,
    },
    (payload, done) => {
      console.log('JWT Payload:', payload); // Log the payload
      const user = { id: payload.sub, username: payload.username };
      if (user) {
        console.log('User found:', user); // Log the user
        return done(null, user);
      } else {
        console.log('User not found'); // Log if user is not found
        return done(null, false);
      }
    }
  )
);
app.use(passport.initialize()); // Initialize Passport

  // Connect MongoDB
  connectDB();


  // Routes Middlewares
  app.use('/auth',authRoutes);
  app.use('/user',passport.authenticate('jwt', { session: false }),userRoutes);
  app.use('/api/user/task',passport.authenticate('jwt', { session: false }),taskRoutes);



app.listen(process.env.PORT,() => console.log(`Server started at ${process.env.SERVER_URL}`));
