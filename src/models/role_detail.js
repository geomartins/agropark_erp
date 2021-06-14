import { roleCollections, configurationCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { convertAccessArrayToObject, convertAccessObjectToArray } from '../repositories/pick'

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
           
            return cb(data, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([], errMessage);
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
                ch.primary_access = convertAccessObjectToArray(ch.primary_access);
                ch.secondary_access =  convertAccessObjectToArray(ch.secondary_access);
                ch.tertiary_access =  convertAccessObjectToArray(ch.tertiary_access);
                data.push(ch);
                 
             });
            return cb(data, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([], errMessage);
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

            var checkDuplicate = (await roleCollections.doc(this.roleId).collection('modules').doc(data.name).get()).exists;
            if(checkDuplicate){ throw new Error('Duplicate Data Entry') }

            const updatedData = data;

            updatedData.primary_access = convertAccessArrayToObject(updatedData.primary_access);
            updatedData.secondary_access = convertAccessArrayToObject(updatedData.secondary_access);
            updatedData.tertiary_access = convertAccessArrayToObject(updatedData.tertiary_access);

            await roleCollections.doc(this.roleId).collection('modules').doc(updatedData.name).set(updatedData).then(()=> {
                return ;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;


            const updatedData = data;

            updatedData.primary_access = convertAccessArrayToObject(updatedData.primary_access);
            updatedData.secondary_access = convertAccessArrayToObject(updatedData.secondary_access);
            updatedData.tertiary_access = convertAccessArrayToObject(updatedData.tertiary_access);

            return roleCollections.doc(this.roleId).collection('modules').doc(moduleId).update(updatedData).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }

    }


     //EXTENSIONS
     fetchExtensions(cb){
        return roleCollections.doc(this.roleId).collection('extensions').orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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

    async extensionDependencies(cb){

        const roles = [];
        const extensions = [];

        const roleDoc = await configurationCollections.doc('roles').get();
        if(roleDoc.exists){
            roles.push(...roleDoc.data().ids);
        }

        const extensionDoc = await configurationCollections.doc('extensions').get();
        if(extensionDoc.exists){
            extensions.push(...extensionDoc.data().ids);
        }

        return cb(roles, extensions);
    }

    async deleteExtensionById(extensionId = null){
        return roleCollections.doc(this.roleId).collection('extensions').doc(extensionId).delete().then(() => {
            return ;
        }).catch(err => console.log(err));
    }

    async saveExtension(data, extensionId = null){

        if(!extensionId){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.id;

            var checkDuplicate = (await roleCollections.doc(this.roleId).collection('extensions').doc(data.name).get()).exists;
            if(checkDuplicate){ throw new Error('Duplicate Data Entry') }

            const updatedData = data;

            await roleCollections.doc(this.roleId).collection('extensions').doc(updatedData.name).set(updatedData).then(()=> {
                return ;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;


            const updatedData = data;

            return roleCollections.doc(this.roleId).collection('extensions').doc(extensionId).update(updatedData).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }

    }



   


    


}


export default RoleDetail;