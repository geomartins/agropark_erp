import { seedBankCollections, requestCollectionGroups, inventoryCollectionGroups, seedBankCropCategoryCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { purifyObject } from '../repositories/pick';

class SeedBank{
    constructor(){}

    //CROP_REQUEST
    static async fetchCropRequests(cb){
        return requestCollectionGroups.where('ref','==','seed_banks').orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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

    //CROP_INVENTORIES
    static async fetchCropInventories(cb){
        return inventoryCollectionGroups.where('ref','==','seed_banks').orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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

    //CROP_CATEGORY
    static async fetchCropCategories(cb){
        return seedBankCropCategoryCollections.orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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

    
    static async saveCropCategory(obj){
        let data = obj;

        if(!obj.id){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.id;
    
            var checkDuplicate = (await seedBankCropCategoryCollections.where('name','==',data.name).get()).empty;
            if(!checkDuplicate){ throw new Error('Duplicate Data Entry') }
            await seedBankCropCategoryCollections.add(purifyObject(data)).then(()=> {
                return ;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            let id = data.id;
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

            return seedBankCropCategoryCollections.doc(id).update(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }
    }

    static async deleteCropCategoryById(id){
        return seedBankCropCategoryCollections.doc(id).get().then(async (sbcDoc) => {
            if (sbcDoc.exists) {
                let measurement = sbcDoc.data().measurement;
                let category = sbcDoc.data().name;
                return seedBankCollections.where('measurement',"==",measurement).where("category","==",category).get().then((sbDoc)=> {
                    if(!sbDoc.empty){
                        throw new Error("Item has crop-type depenedencies");
                    }else{
                        sbcDoc.ref.delete();
                    }
                })
            }
            return ;
        }).then((_) => {
            return ;
        }).catch(err => {
            throw err;
        });

    }



    //CROP_TYPE
    static async fetchCropTypes(cb){
        return seedBankCollections.orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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

    static async saveCropType(obj){
        let data = obj;

        if(!obj.id){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            data.inventory_refs = { available_stock: 0, reserved_stock: 0 }
            data.request_refs = { approved: 0, declined: 0, unattended: 0 }
            delete data.id;

            var checkDuplicate = (await seedBankCollections.where('name','==',data.name).where('category','==', data.category).where('price','==',data.price).get()).empty;
            if(!checkDuplicate){ throw new Error('Duplicate Data Entry') }
            await seedBankCollections.add(purifyObject(data)).then(()=> {
                return ;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            let id = data.id;
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

            return seedBankCollections.doc(id).update(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }
    }


    static async deleteCropTypeById(id){
        return seedBankCollections.doc(id).collection('inventories').get().then(docs => {
            if(!docs.empty){
                throw new Error("Item has inventory dependencies");
            }
            return seedBankCollections.doc(id).delete();
        })
        .then(() => {
            return ;
        }).catch(err => {
            throw err;
        })

        


    }



}


export default SeedBank;