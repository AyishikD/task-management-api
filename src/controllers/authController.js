const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users, saveUsers } = require('../utils/fileStore'); // Use file-based storage for users
const Joi = require('joi');

// Schema for user validation
const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(user);
};

// POST /auth/register
exports.register = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { username, password } = req.body;

        // Check if the user already exists
        if (users[username]) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Hash the password and save the user
        const hashedPassword = await bcrypt.hash(password, 10);
        users[username] = { password: hashedPassword };
        saveUsers();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// POST /auth/login
exports.login = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { username, password } = req.body;

        // Check if the user exists and validate the password
        const user = users[username];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ error: 'JWT secret is not defined' });
        }

        const token = jwt.sign({ username }, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
};
