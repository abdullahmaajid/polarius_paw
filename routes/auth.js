const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db'); // File koneksi database, sesuaikan dengan struktur proyek Anda

// Route untuk menampilkan halaman login
router.get('/login', (req, res) => {
    res.render('login');
});

// Route untuk menampilkan halaman signup
router.get('/signup', (req, res) => {
    res.render('signin');
});

// Route untuk proses signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error.');
            }
            res.redirect('/auth/login');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
});


// Route untuk proses login
// Route untuk proses login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username dan password wajib diisi!');
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Gagal login.');
        }

        if (results.length === 0) {
            return res.status(400).send('Pengguna tidak ditemukan.');
        }

        const user = results[0];

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Password salah.');
        }

        // Login berhasil, arahkan ke halaman "/"
        res.redirect('/');
    });
});


module.exports = router;
