const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const errorMiddleware = require('./middleware/errorMiddleWare');
const garmentRoutes = require('./routes/garmentRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// connect to mongodb
mongoose
  .connect('mongodb://127.0.0.1/shop_db')
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((err) => {
    console.log('mondoDB connection error:', err);
  });

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// session configuration
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set tot true if using https
  })
);

// flash message
app.use(flash());

// make flash mesage available to all templates
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Shop App');
});

app.use('/garments', garmentRoutes);
app.use('/products', productRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`shop app listening on http://127.0.0.1:${PORT}`);
});
