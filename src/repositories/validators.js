import { snackbar } from '../repositories/plugins';
const loginValidator = async (email, password = '') => {
    let result = true;
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(mailformat)){
        snackbar('warning', 'Invalid email address')
        result = false;
    }

    if(password.length < 4){
        snackbar('warning', 'Invalid password ')
        result = false;
    }
    return result;
}

const passwordResetValidator = async (email = '') => {
    let result = true;
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(mailformat)){
        snackbar('warning', 'Invalid email address')
        result = false;
    }
    return result;
}

const confirmPasswordValidator = async (code,password) => {
    let result = true;
    var passformat=  /^[A-Za-z]\w{7,14}$/;
    if(!password.match(passformat)){
        snackbar('warning', 'Password must be 7 to 15 characters');
        snackbar('warning', 'Password first character must be a letter')
        snackbar('warning', 'Password can contain numeric digits, underscore')
        result = false;
    }

    if(code.length < 4){
        snackbar('warning', 'Invalid code format ')
        result = false;
    }
    return result;
}

const passwordMatchValidator = async (password, confirm_password) => {
    let result = true;
    if(password != confirm_password){
        snackbar('warning', 'Password and Confirm Password does not match ')
        result = false;
    }

    return result;
}

export {
    loginValidator,
    passwordResetValidator,
    confirmPasswordValidator,
    passwordMatchValidator,
};