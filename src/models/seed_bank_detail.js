import { seedBankCollections, configurationCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'

let inventoryDataRef = null;
let inventoryData = [];

let requestDataRef = null;
let requestData = [];



class SeedBankDetail{
    constructor(seedBankId){
        this.seedBankId = seedBankId;
    }

    //DOC
    fetchDoc(cb){
        return seedBankCollections.doc(this.seedBankId).onSnapshot((doc) => {
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

    //INVENTORIES
    fetchInventories(type, cb){
        let ref;
        if(inventoryDataRef && type == 'next'){
            ref = seedBankCollections.doc(this.seedBankId).collection('inventories').orderBy('createdAt','desc').startAfter(inventoryDataRef).limit(25);
        }else if(type == 'initial'){
            ref = seedBankCollections.doc(this.seedBankId).collection('inventories').orderBy('createdAt','desc').limit(25);
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
             console.log(inventoryData,'yes ooo')
            return cb(inventoryData, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([],errMessage);
            
        }); 



       
    }

    //REQUESTS
    fetchRequests(type, cb){
        let ref;
        if(requestDataRef && type == 'next'){
            ref = seedBankCollections.doc(this.seedBankId).collection('requests').orderBy('createdAt','desc').startAfter(requestDataRef).limit(25);
        }else if(type == 'initial'){
            ref = seedBankCollections.doc(this.seedBankId).collection('requests').orderBy('createdAt','desc').limit(25);
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
             console.log(requestData,'yes ooo')
            return cb(requestData, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([],errMessage);
            
        }); 

    }


    

    async saveInventory(data){

        if(data.type == "add"){
            console.log('ADDDDDDDDDDDDDDDDDDDDDDD')
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            data.ref = "seed_banks";
            delete data.id;

            //USER TRANSACTION HERE
            var seedBankDoc = seedBankCollections.doc(this.seedBankId);
            var seedBankInventoryDoc = seedBankCollections.doc(this.seedBankId).collection('inventories').doc();
            
           
                return fs.runTransaction((transaction) => {
                    return transaction.get(seedBankDoc).then( (sDoc) => {
                        if (!sDoc.exists) {
                            throw new Error("Document does not exist!");
                        }

                        // [old_data] 
                        let old_inventory_refs = sDoc.data().inventory_refs;
                        let module_refs = {
                            category: sDoc.data().category,
                            name: sDoc.data().name,
                            measurement: sDoc.data().measurement,
                            price: sDoc.data().price
                        }
    
                        // [new_data] 
                        let new_inventory_refs = {
                            available_stock: old_inventory_refs.available_stock + data.quantity,
                            reserved_stock: old_inventory_refs.reserved_stock
                        }
                       
                        transaction.update(seedBankDoc, {
                            inventory_refs: new_inventory_refs
                        });

                        transaction.set(seedBankInventoryDoc, {
                                ...data,
                                old_seed_bank_refs: old_inventory_refs,
                                new_seed_bank_refs: new_inventory_refs,
                                module_refs: module_refs
                               
                         })
                        return ;
                    });
                }).then(()=> {
                    return ;
                }).catch((err) => {
                    throw err;
                });


        }

        if(data.type == "remove"){
            console.log('REMOVEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            data.ref = "seed_banks";
            delete data.id;

            //USER TRANSACTION HERE
            var seedBankDoc = seedBankCollections.doc(this.seedBankId);
            var seedBankInventoryDoc = seedBankCollections.doc(this.seedBankId).collection('inventories').doc();
            
           
                return fs.runTransaction((transaction) => {
                    return transaction.get(seedBankDoc).then( (sDoc) => {
                        if (!sDoc.exists) {
                            throw new Error("Document does not exist!");
                        }

                        // [old_data] 
                        let old_inventory_refs = sDoc.data().inventory_refs;
                        let module_refs = {
                            category: sDoc.data().category,
                            name: sDoc.data().name,
                            measurement: sDoc.data().measurement,
                            price: sDoc.data().price
                        }
    
                        // [new_data] 
                        let new_inventory_refs = {
                            available_stock: old_inventory_refs.available_stock - data.quantity,
                            reserved_stock: old_inventory_refs.reserved_stock
                        }

                        if(new_inventory_refs.available_stock < 0){
                            throw new Error("Available stock cannot be less than 0");
                        }
                       
                        transaction.update(seedBankDoc, {
                            inventory_refs: new_inventory_refs
                        });

                        transaction.set(seedBankInventoryDoc, {
                                ...data,
                                old_seed_bank_refs: old_inventory_refs,
                                new_seed_bank_refs: new_inventory_refs,
                                module_refs: module_refs
                               
                         })
                        return ;
                    });
                }).then(()=> {
                    return ;
                }).catch((err) => {
                    throw err;
                });



        }


    }


     



   


    


}


export default SeedBankDetail;