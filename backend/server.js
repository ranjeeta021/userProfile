const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 5000;

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database: 'AuthTable'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

// Middleware
app.use(express.json());
app.use(cors());


// Register endpoint
app.post('/register', (req, res) => {
    const {  username, password, phoneNumber, email, dob } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (email, password,username,phoneNumber,dob) VALUES (?, ?, ?,?,?)';
    db.query(sql, [email, hashedPassword,username,phoneNumber,dob], (err, result) => {
        if (err) {
            console.log(err, "checking")
            res.status(500).json({ error: 'Registration failed' });
        } else {
            res.status(201).json({ message: 'Registration successful' });
        }
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Server error' });
        } else if (results.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
        } else {
            const user = results[0];
            const isPasswordValid = bcrypt.compareSync(password, user.Password);

            if (isPasswordValid) {
                const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
                res.status(200).json({ token,userid:user.id });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        }
    });
});

// Get user details endpoint
app.get('/user/:userid', (req, res) => {
    const userId = req.params.userid;
    const sql = 'SELECT id, email,username,phoneNumber,dob FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Server error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const user = results[0];
            res.status(200).json(user);
        }
    });
});

app.put('/user', (req, res) => {
    const userId = req.userId;
    const { username, phoneNumber,dob } = req.body;

    const sql = 'UPDATE users SET username = ? , phoneNumber = ? ,dob= ?   WHERE id = ?';
    db.query(sql, [username,phoneNumber,dob, userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Update failed' });
        } else {
            res.status(200).json({ message: 'Update successful' });
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
