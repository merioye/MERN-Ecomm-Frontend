const regex = {
    name: '^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$',
    email: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}',
    password: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$'
};

module.exports = regex;