const bcrypt = require('bcrypt');
const User = require('./User');
const fs = require('fs');

const saltRounds = 10;

const getUsers = () => {
    const data = fs.readFileSync('./db/users.json');
    return JSON.parse(data).users;
};

const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync('./db/users.json', JSON.stringify({ users }));
};

const registerUser = async (username, email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User(username, email, hashedPassword, role);
    saveUser(user);
    return user;
};

const findUserByEmail = (email) => {
    const users = getUsers();
    return users.find(user => user.email === email);
};

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { registerUser, findUserByEmail, comparePasswords };
