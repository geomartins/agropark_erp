import { firebaseAuth } from '../boot/firebase'
class AuthService{
    async login(email, password){
        return firebaseAuth.signInWithEmailAndPassword(email, password).then(user => {
            return user;
        }).catch(err => {
            throw err;
        });
    }
    async password_reset(email){
        return firebaseAuth.sendPasswordResetEmail(email).then(result => {
            return result;
        }).catch(err => {
            throw err;
        });
    }

    async  password_reset_confirmation(code,password){
        return firebaseAuth.confirmPasswordReset(code,password).then(() => {
            return null;
        }).catch(err => {
            throw err;
        });
    }

    static logout(){
        firebaseAuth.signOut().then(result => {
            return result;
        }).catch(err => {
            throw err;
        })
    }
}

export default AuthService;