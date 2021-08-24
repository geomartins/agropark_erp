import { seedBankCollections, requestCollectionGroups, inventoryCollectionGroups, seedBankCropCategoryCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { purifyObject } from '../repositories/pick';


let requestDataRef = null;
let requestData = [];

let inventoryDataRef = null;
let inventoryData = [];


let cropCategoryDataRef = null;
let cropCategoryData = [];

let cropTypeDataRef = null;
let cropTypeData = [];



class SeedBank{
    constructor(){}

    //CROP_REQUEST
    static async fetchCropRequests(type, cb){
        let ref;
        if(requestDataRef && type == 'next'){
            ref = requestCollectionGroups.where('ref','==','seed_banks').orderBy('createdAt','desc').startAfter(requestDataRef).limit(10);
        }else if(type == 'initial'){
            requestData = [];
            ref = requestCollectionGroups.where('ref','==','seed_banks').orderBy('createdAt','desc').limit(10);
        }

        return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            if(lastVisible){
                 requestDataRef = lastVisible;
            }
            if(!querySnapshot.empty){
                requestData = [];
            }

            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                requestData.push(ch);
                 
             });

             querySnapshot.docChanges().forEach((change) => {
                if(querySnapshot.empty && change.type === "removed"){
                    requestData = [];
                }
            });
             console.log(requestData,'yes ooo')
            return cb(requestData, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([],errMessage);
            
        }); 
    }

    //CROP_INVENTORIES
    static async fetchCropInventories(type,cb){
        let ref;
        if(inventoryDataRef && type == 'next'){
            ref = inventoryCollectionGroups.where('ref','==','seed_banks').orderBy('createdAt','desc').startAfter(inventoryDataRef).limit(10);
        }else if(type == 'initial'){
            inventoryData = [];
            ref = inventoryCollectionGroups.where('ref','==','seed_banks').orderBy('createdAt','desc').limit(10);
        }

        return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            if(lastVisible){
                 inventoryDataRef = lastVisible;
                
            }
            if(!querySnapshot.empty){
                inventoryData = [];
            }

            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                inventoryData.push(ch);
                 
             });

             querySnapshot.docChanges().forEach((change) => {
                if(querySnapshot.empty && change.type === "removed"){
                    inventoryData = [];
                }
            });
             console.log(inventoryData,'yes ooo')
            return cb(inventoryData, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([],errMessage);
            
        }); 
    }

    //CROP_CATEGORY
    static async fetchCropCategories(type,cb){
        let ref;
        if(cropCategoryDataRef && type == 'next'){
            console.log('crop category next')
            ref = seedBankCropCategoryCollections.orderBy('createdAt','desc').startAfter(cropCategoryDataRef).limit(10);
        }else if(type == 'initial'){
            console.log('crop category initial')
            cropCategoryData = [];
            ref = seedBankCropCategoryCollections.orderBy('createdAt','desc').limit(10);
        }

        return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            if(lastVisible){
                cropCategoryDataRef = lastVisible;
            }
            if(!querySnapshot.empty){
                cropCategoryData = [];
            }

            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                cropCategoryData.push(ch);
                 
             });

             querySnapshot.docChanges().forEach((change) => {
                if(querySnapshot.empty && change.type === "removed"){
                    cropCategoryData = [];
                }
            });
             console.log(cropCategoryData,'yes ooo')
            return cb(cropCategoryData, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([],errMessage);
            
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
    static async fetchCropTypes(type, cb){
        let ref;
        if(cropTypeDataRef && type == 'next'){
            ref = seedBankCollections.orderBy('createdAt','desc').startAfter(cropTypeDataRef).limit(10);
        }else if(type == 'initial'){
            cropTypeData = [];
            ref = seedBankCollections.orderBy('createdAt','desc').limit(10);
        }

        return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            if(lastVisible){
                cropTypeDataRef = lastVisible;
            }
            if(!querySnapshot.empty){
                cropTypeData = [];
            }

            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                cropTypeData.push(ch);
                 
             });

             querySnapshot.docChanges().forEach((change) => {
                if(querySnapshot.empty && change.type === "removed"){
                    cropTypeData = [];
                }
            });
             console.log(cropTypeData,'yes ooo')
            return cb(cropTypeData, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([],errMessage);
            
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