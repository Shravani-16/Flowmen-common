const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const saltRounds = 10;
const usersFilePath = path.join(__dirname, './db/users.json');

// Function to read user data safely
const getUsers = () => {
    try {
        if (!fs.existsSync(usersFilePath)) {
            return [];
        }
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return data ? JSON.parse(data).users : [];
    } catch (error) {
        console.error("Error reading users file:", error);
        return [];
    }
};

// Function to save user data
const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2));
    } catch (error) {
        console.error("Error writing to users file:", error);
    }
};

// Register a new user
const registerUser = async (username, email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = { username, email, password: hashedPassword, role };
    
    saveUser(user);
    return user;
};

// Find a user by email
const findUserByEmail = (email) => {
    const users = getUsers();
    return users.find(user => user.email === email);
};

// Compare passwords
const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { registerUser, findUserByEmail, comparePasswords };
