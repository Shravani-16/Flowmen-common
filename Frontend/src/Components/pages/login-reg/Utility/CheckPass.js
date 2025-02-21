export const checkPassword = (password) => {
    if (password.length < 8 || password.length > 16) {
        return false;     
    }
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    if (!/[@_!#$%^&*()<>?/\|}{~:]/.test(password)) {
        return false;
    }
    return true;
};



