import { userCollections, firebaseAuth, timestamp } from '../boot/firebase'

class UserDetail{
    constructor(userId){
        this.userId = userId;
    }

    fetchPersonalInformation(cb){
        console.log(this.userId)
        return userCollections.doc(this.userId).onSnapshot((doc) => {

            let data = {};

            if(doc.exists){
                data.firstname = doc.data().firstname;
                data.middlename = doc.data().middlename;
                data.lastname = doc.data().lastname;
                data.role = doc.data().role;
                data.id = doc.id;
                console.log(data);
            }
           
            return cb(data)
        },(err) => {
            throw err;
        });
    }

    fetchDepartments(cb){
        return userCollections.doc(this.userId).collection('departments').orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                data.push(ch);
                 
             });
            return cb(data)
        },(err) => {
            throw err;
        });
    }

    async deleteDepartmentById(deptId = null){
        return userCollections.doc(this.userId).collection('departments').doc(deptId).delete().then(() => {
            return ;
        }).catch(err => console.log(err));
    }

    async saveDepartment(data, deptId = null){

        if(!deptId){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.id;

            return userCollections.doc(this.userId).collection('departments').doc().add(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

            return userCollections.doc(this.userId).collection('departments').doc(deptId).update(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }

    }
    


}


export default UserDetail;