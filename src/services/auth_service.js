import { firebaseAuth,  } from '../boot/firebase'
class AuthService{
    constructor(){
        
    }
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

    async customClaim(){
        console.log(firebaseAuth)
//         firebase.auth().currentUser.getIdTokenResult()
//   .then((idTokenResult) => {
//      // Confirm the user is an Admin.
//      if (!!idTokenResult.claims.admin) {
//        // Show admin UI.
//        showAdminUI();
//      } else {
//        // Show regular user UI.
//        showRegularUI();
//      }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
        // console.log(await firebaseAuth.currentUser)
        firebaseAuth.currentUser.getIdTokenResult().then((idTokenResult) => {
            //get the user custom claim: e.g coo, cfo
            return idTokenResult.claims.admin;
        }).catch(err => {
            throw err;
        });
    }

    static async logout(){
        return firebaseAuth.signOut().then(result => {
            return result;
        }).catch(err => {
            throw err;
        })
    }
}

export default AuthService;