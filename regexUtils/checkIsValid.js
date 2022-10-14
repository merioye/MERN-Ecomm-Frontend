// function to test value using regular expression
const checkIsValid = (value, regex)=>{
    return RegExp(regex).test(value);
}

module.exports = checkIsValid;