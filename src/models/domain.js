import { domainCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';
import AlgoliaService from '../services/algolia_service';

let dataRef = null;
let data = [];
class Domain{
    constructor(name, id = null){
        this.name = name;
        this.id = id;
    }

    fetch(type,cb){
        let ref;
        if(dataRef && type == 'next'){
            console.log('In AAAAAAAAA')
            // console.log('Inside old data', dataRef)
            ref = domainCollections.orderBy('createdAt','desc').startAfter(dataRef).limit(25);
        }else if(type == 'initial'){
            console.log('In BBBBB')
            data = [];
            ref = domainCollections.orderBy('createdAt','desc').limit(25);
        }

        return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            if(lastVisible){
                 dataRef = lastVisible;
            }
            if(!querySnapshot.empty){
                data = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data(), 'truest')
                    let ch = { ...doc.data() };
                    ch.id = doc.id;
                    data.push(ch);
                     
                });
            }else{
                console.log('No data available');
            }

           
            
            

            querySnapshot.docChanges().forEach((change) => {
                if(querySnapshot.empty && change.type === "removed"){
                    data = [];
                }
            });

            
             console.log(data,'yes ooo')
            
            return cb(data, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([],errMessage);
            
        }); 


       
    }

    async save(){
        let data = this;

        if(!this.id){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.id;
    
            var checkDuplicate = (await domainCollections.doc(generateUid(data.name)).get()).exists;
            if(checkDuplicate){ throw new Error('Duplicate Data Entry') }
            await domainCollections.doc(generateUid(data.name)).set(purifyObject(data)).then(()=> {
                return ;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            let id = data.id;
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

            return domainCollections.doc(id).update(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }
    }

    static async search(newValue){
        return new AlgoliaService("domains").search(newValue).then((result) => {
            return result;
        }).catch(err => {
            throw err;
        })
    }


    static async deleteById(id){
        let data = {};
        data.deletedAt = timestamp; data.deleter = firebaseAuth.currentUser.displayName;
        await domainCollections.doc(id).update(data);

        return domainCollections.doc(id).delete().then(() => {
            return ;
        }).catch(err => console.log(err));
    }



}


export default Domain;