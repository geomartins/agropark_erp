import { roleCollections, configurationCollections, firebaseAuth, timestamp } from '../boot/firebase'

class RoleDetail{
    constructor(roleId){
        this.roleId = roleId;
    }

    //ROLE_INFORMATION
    fetchRoleInformation(cb){
        return roleCollections.doc(this.roleId).onSnapshot((doc) => {
            let data = {};

            if(doc.exists){
                data = { ...doc.data(), id: doc.id };
                console.log(data);
            }
           
            return cb(data)
        },(err) => {
            throw err;
        });
    }

    
  

    async saveRoleInformation(data, roleInformationId = null){
        delete data.id;
        data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

        return roleCollections.doc(roleInformationId).update(data).then((docRef) => {
            return docRef;
        }).catch(err => {
            throw err;
        });
    }


 

    //MODULES
    fetchModules(cb){
        return roleCollections.doc(this.roleId).collection('modules').orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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

    async moduleDependencies(cb){
        return configurationCollections.doc('modules').get().then(doc => {
            if(!doc.exists){
               return cb([])
            }        
            return cb(doc.data().ids);
        })
    }


    async deleteModuleById(moduleId = null){
        return roleCollections.doc(this.roleId).collection('modules').doc(moduleId).delete().then(() => {
            return ;
        }).catch(err => console.log(err));
    }

    async saveModule(data, moduleId = null){

        if(!moduleId){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.id;

            return roleCollections.doc(this.roleId).collection('modules').doc().set(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;


            return roleCollections.doc(this.roleId).collection('modules').doc(moduleId).update(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }

    }


   


    


}


export default RoleDetail;