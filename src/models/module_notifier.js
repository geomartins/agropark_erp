import { moduleNotifierCollections } from '../boot/firebase'
import { getData } from '../repositories/plugins'
import { subtractFromDate } from '../repositories/pick'




let dataRef = null;
let data = [];
class ModuleNotifier{
    constructor(){
        this.uid = getData("uid");
        this.role = getData('role');
        this.date = subtractFromDate(new Date(), 48);
    }

    async fetch(type, cb){
        let ref;
        if(dataRef && type == 'next'){
            // console.log('Inside old data', dataRef)
            ref = moduleNotifierCollections.where("roles","array-contains",this.role)
                .where("timestamp",">=",this.date).orderBy('timestamp','desc').startAfter(dataRef).limit(10);
        }else if(type == 'initial'){
            data = [];
            ref = moduleNotifierCollections.where("roles","array-contains",this.role)
                .where("timestamp",">=",this.date).orderBy('timestamp','desc').limit(10);
        }

        return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            if(lastVisible){
                 dataRef = lastVisible;
            }
            if(!querySnapshot.empty){
                data = [];
                querySnapshot.forEach((doc) => {
                    let ch = { ...doc.data() };
                    if(doc.data().visited_ids){
                         ch.seen = doc.data().visited_ids.includes(this.uid) ? true : false;
                    }else{
                        ch.seen = false;
                    }
                    ch.id = doc.id;
                    data.push(ch);
                     
                });
            }else{
                console.log('No data available');
            }
            
            return cb(data, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([],errMessage);
            
        }); 
    }


}


export default ModuleNotifier;