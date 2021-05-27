import { userCollections, configurationCollections, firebaseAuth, timestamp } from '../boot/firebase'
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
           
            return cb(data)
        },(err) => {
            throw err;
        });
    }
    async personalInformationDependencies(cb){
        const nationalities = [];
        const religions = [];
        const blood_types = [];
        const marital_status = [];
        const roles = [];
        const genders = [];

        const nationalityDoc = await configurationCollections.doc('nationalities').get();
        if(nationalityDoc.exists){
            nationalities.push(...nationalityDoc.data().ids);
        }

        const religionDoc = await configurationCollections.doc('religions').get();
        if(religionDoc.exists){
            religions.push(...religionDoc.data().ids);
        }
       
        const bloodTypeDoc = await configurationCollections.doc('blood_types').get();
        if(bloodTypeDoc.exists){
            blood_types.push(...bloodTypeDoc.data().ids);
        }

        const maritalStatusDoc = await configurationCollections.doc('marital_status').get();
        if(maritalStatusDoc.exists){
            marital_status.push(...maritalStatusDoc.data().ids);
        }

        const roleDoc = await configurationCollections.doc('roles').get();
        if(roleDoc.exists){
            roles.push(...roleDoc.data().ids);
        }

        const genderDoc = await configurationCollections.doc('genders').get();
        if(genderDoc.exists){
            genders.push(...genderDoc.data().ids);
        }
       
        return cb(nationalities, religions, blood_types, marital_status, roles, genders);
    }

    async savePersonalInformation(data, personalInformationId = null){
        delete data.id;
        let dob = data.dob;
        data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;
        delete data.dob;
        if(dob){ data.dob = convertJSDateToServerTimestamp(new Date(dob));}
        console.log(data, 'ccccccccccccccc')



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


    //SETTING
    async saveSetting(data){
        data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

        return userCollections.doc(this.userId).update(data).then((docRef) => {
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