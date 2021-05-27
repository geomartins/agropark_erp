import { firebaseStorage } from '../boot/firebase'
import { uid } from 'quasar'
class StorageService{
    constructor(){}

    async upload(upload, cb){
      var imageName = uid();
      try {
        //save image
        let file = upload;
        var storageRef = firebaseStorage.ref();
        var imageRef = storageRef.child(`images/${imageName}`);
        await imageRef.put(file);
        var downloadURL = await imageRef.getDownloadURL();
        console.log(downloadURL);
        return cb(downloadURL);
      } catch (error) {
        console.log(error);
      }
    }

    async uploads(storagePath, uploads, cb ){
      try {
        let result = [];
        for(let upload of uploads){
          let imageName = uid();
          let file = upload;
          var storageRef = firebaseStorage.ref();
          var imageRef = storageRef.child(`${storagePath}/${imageName}`);
          await imageRef.put(file);
          var downloadURL = await imageRef.getDownloadURL();
          result.push(downloadURL);
        }
        return cb(result);

      } catch (error) {
        console.log(error);
      }
    }

    // upload(e){
    //     if(e.target.files[0]){
        
    //         let file = e.target.files[0];
    //         var storageRef = firebaseStorage.ref('avatars/'+ Math.random() + '_'  + file.name);
    //         let uploadTask  = storageRef.put(file);
      
    //         uploadTask.on('state_changed', (snapshot) => {
    //           var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //           console.log('Upload is ' + progress + '% done');
    //         }, (error) => {
    //           // Handle unsuccessful uploads
    //         }, () => {
    //           // Handle successful uploads on complete
    //           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              
    //           uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //             // this.product.images.push(downloadURL);
    //             console.log(downloadURL,' this is the download url');
    //           });
    //         });
    //     }
    // }

    async delete(imageUrl){
        return firebaseStorage.refFromURL(imageUrl).delete().then(() => {
            return ;
        }).catch(err => {
            throw err;
        });
    }
}

export default StorageService;