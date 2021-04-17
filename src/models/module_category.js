import { moduleCategoryCollections, firebaseAuth, timestamp } from '../boot/firebase'
class ModuleCategory{
    constructor(name, description, id = null){
        this.name = name;
        this.description = description;
        this.id = id;
        this.user = firebaseAuth.currentUser ? firebaseAuth.currentUser.uid : null;
    }

    static fetch(cb){
        let data = [];
        let unsubscribe = moduleCategoryCollections.orderBy('timestamp','desc').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push({ 
                    name: doc.data().name,
                    description: doc.data().description, 
                    timestamp: doc.data().timestamp, 
                    id: doc.id
                });
            });
        },(err) => {
            throw err;
        });
        return cb(data, unsubscribe);
    }

    async save(){
        let data = this;

        if(this.id == null){  //add
            data.timestamp = timestamp;
            delete data.id;
    
            return moduleCategoryCollections.add(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            delete data.id;
            return moduleCategoryCollections.doc(this.id).update(data).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }
        
    }


    static async deleteById(id){
        return moduleCategoryCollections.doc(id).delete().then(()=> {
            return null;
        }).catch(err => {
            throw err;
        });
    }


}


export default ModuleCategory;