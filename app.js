const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const homeRoutes = require('./routes/home');
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');
const jadwalRoutes = require('./routes/jadwal'); // Route untuk jadwal
const gajiRoutes = require('./routes/gaji');     // Route untuk gaji

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk parsing data form
app.use(express.urlencoded({ extended: true })); // Parsing application/x-www-form-urlencoded
app.use(express.json()); // Parsing application/json

// Set EJS sebagai view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk file statis (membuat folder 'public' dapat diakses)
app.use(express.static(path.join(__dirname, 'public')));

// Routing utama
app.use('/', homeRoutes); // Route untuk halaman utama
app.use('/todo', todoRoutes); // Route untuk todo
app.use('/auth', authRoutes); // Route untuk autentikasi
app.use('/jadwal', jadwalRoutes); // Route untuk jadwal
app.use('/gaji', gajiRoutes);     // Route untuk gaji

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
