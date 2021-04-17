import { snackbar } from '../repositories/plugins';
class ChainValidators{
    constructor(value, label){
        this.value = value;
        this.label = label;
        this.validate = true;
    }
    get val(){
        return this.value;
    }

    get validator(){
        return this.validate;
    }


    trim(){
        this.value = this.value.trim();
        return this;
    }
    validateEmail(){
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!this.value.match(mailformat)){
            snackbar('warning', 'Invalid email address')
            this.validate = false;
        }
        return this;
    }

    validateLength(len){
       if(this.value.length < len){
          snackbar('warning', this.label+' field must be equal or greater than '+len)
          this.validate = false;
       }

       return this;
    }

    notNull(){
        if(!this.value){
            snackbar('warning', this.label+' field cannot be empty or null')
            this.validate = false;
        }

        return this;
    }

}

export default ChainValidators