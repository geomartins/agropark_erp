import { userCollections, dependencyCollections, firebaseAuth, timestamp, fs, firebaseStorage } from '../boot/firebase'
import { convertJSDateToServerTimestamp, convertServerTimestampToJSDate } from '../repositories/pick'

class UserDetail{
    constructor(userId){
        this.userId = userId;
    }

    //PERSONAL_INFORMATION
    fetchPersonalInformation(cb){
        return userCollections.doc(this.userId).onSnapshot((doc) => {
            let data = {};

            if(doc.exists){
                let dob = doc.data().dob;
                data = { ...doc.data(), id: doc.id, dob: dob ? convertServerTimestampToJSDate(dob) : '' };
                console.log(data);
            }
           
            return cb(data, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([], errMessage);
        });
    }
    static async fetchRoleDependency(cb){
        return dependencyCollections.doc('roles').onSnapshot((querySnapshot) => {
            if(querySnapshot.exists){
               return cb(querySnapshot.data(), null);
            }else{
                return cb({}, null);
            }

        }, (err) => {
            const errMessage = {message: err.code };
            return cb({},errMessage);
        })
    }
    static async fetchUserDependency(cb){
        return dependencyCollections.doc('users').onSnapshot((querySnapshot) => {
            if(querySnapshot.exists){
               return cb(querySnapshot.data(), null);
            }else{
                return cb({}, null);
            }

        }, (err) => {
            const errMessage = {message: err.code };
            return cb({},errMessage);
        })
       
    }


    async savePersonalInformation(data, personalInformationId = null){
        delete data.id;
        let dob = data.dob;
        data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;
        delete data.dob;
        if(dob){ data.dob = convertJSDateToServerTimestamp(new Date(dob));}

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
            return cb(data, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([], errMessage);
        });
    }


    async deleteBankById(bankId = null){
        let data = {};
        data.deletedAt = timestamp; data.deleter = firebaseAuth.currentUser.displayName;
        await userCollections.doc(this.userId).collection('banks').doc(bankId).update(data);

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
            return cb(data,null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([], errMessage);
        });
    }

    async deleteKinById(kinId = null){
        let data = {};
        data.deletedAt = timestamp; data.deleter = firebaseAuth.currentUser.displayName;
        await userCollections.doc(this.userId).collection('kins').doc(kinId).update(data);

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
            return cb(data,null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([], errMessage);
        });
    }


    async deleteDepartmentById(deptId = null){
        let data = {};
        data.deletedAt = timestamp; data.deleter = firebaseAuth.currentUser.displayName;
        await userCollections.doc(this.userId).collection('departments').doc(deptId).update(data);

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


    //DOCUMENTS
    fetchDocuments(cb){
        return userCollections.doc(this.userId).collection('documents').orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                data.push(ch);
             });
            return cb(data, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([], errMessage);
        });
    }

    async saveDocument(data, urls = []){
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default

            let batch = fs.batch();
            for(let url of urls){
                let ref = userCollections.doc(this.userId).collection('documents').doc();
                let inputData = data;
                inputData.url = url;
                batch.set(ref, inputData);
            }

            // Commit the batch
            return batch.commit().then(() => {
                return ;
            }).catch(err => {
                throw err;
            });
    }

    async deleteDocumentById(docId = null, url){
        let data = {};
        data.deletedAt = timestamp; data.deleter = firebaseAuth.currentUser.displayName;
        await userCollections.doc(this.userId).collection('documents').doc(docId).update(data);

        return firebaseStorage.refFromURL(url).delete().then(() => {
            return userCollections.doc(this.userId).collection('documents').doc(docId).delete();
        }).then(()=> {
            return ;
        }).catch(err => console.log(err));;
       
    }


    //RESET
    async saveReset(data){
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.confirm_password;

            return userCollections.doc(this.userId).collection('resets').doc().set(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
    }


    



    async saveAvatar(data){
        data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

        return userCollections.doc(this.userId).update(data).then((docRef) => {
            return docRef;
        }).catch(err => {
            throw err;
        });
    }



    


}


export default UserDetail;