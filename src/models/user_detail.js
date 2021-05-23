import { userCollections, configurationCollections, firebaseAuth, timestamp } from '../boot/firebase'

class UserDetail{
    constructor(userId){
        this.userId = userId;
    }

    //PERSONAL_INFORMATION
    fetchPersonalInformation(cb){
        return userCollections.doc(this.userId).onSnapshot((doc) => {

            let data = {};

            if(doc.exists){
                data = { ...doc.data(), id: doc.id};
                console.log(data);
            }
           
            return cb(data)
        },(err) => {
            throw err;
        });
    }
    async personalInformationDependencies(cb){
        return configurationCollections.doc('banks').get().then(doc => {
            if(!doc.exists){
               return cb([])
            }        
            return cb(doc.data().ids);
        })
    }

    async savePersonalInformation(data, personalInformationId = null){
        delete data.id;
        data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

        return userCollections.doc(personalInformationId).update(data).then((docRef) => {
            return docRef;
        }).catch(err => {
            throw err;
        });
    }


    //BANKS

    fetchBanks(cb){
        return userCollections.doc(this.userId).collection('banks').orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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

    async bankDependencies(cb){
        return configurationCollections.doc('banks').get().then(doc => {
            if(!doc.exists){
               return cb([])
            }        
            return cb(doc.data().ids);
        })
    }

    async deleteBankById(bankId = null){
        return userCollections.doc(this.userId).collection('banks').doc(bankId).delete().then(() => {
            return ;
        }).catch(err => console.log(err));
    }

    async saveBank(data, bankId = null){
        

        if(!bankId){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.id;

            return userCollections.doc(this.userId).collection('banks').doc().set(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;


            return userCollections.doc(this.userId).collection('banks').doc(bankId).update(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }

    }



    


    //KINS
    fetchKins(cb){
        return userCollections.doc(this.userId).collection('kins').orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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
    async kinDependencies(cb){
        return configurationCollections.doc('relationships').get().then(doc => {
            if(!doc.exists){
               return cb([])
            }        
            return cb(doc.data().ids);
        })
    }

    async deleteKinById(kinId = null){
        return userCollections.doc(this.userId).collection('kins').doc(kinId).delete().then(() => {
            return ;
        }).catch(err => console.log(err));
    }

    async saveKin(data, kinId = null){

        if(!kinId){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.id;

            return userCollections.doc(this.userId).collection('kins').doc().set(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;


            return userCollections.doc(this.userId).collection('kins').doc(kinId).update(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }

    }




    //DEPARTMENTS
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

    async departmentDependencies(cb){
        return configurationCollections.doc('departments').get().then(doc => {
            if(!doc.exists){
               return cb([])
            }        
            return cb(doc.data().ids);
        })
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

            return userCollections.doc(this.userId).collection('departments').doc().set(data).then((docRef) => {
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