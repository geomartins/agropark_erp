
import firebase from 'firebase/app'

// import "firebase/analytics";

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'
import Pushy from 'pushy-sdk-web';
import { snackbar, fcmSnackbar } from '../repositories/plugins'

var firebaseConfig = {
    apiKey: "AIzaSyAvvHd4hsC_EoDzSJu-KfrUBrmiRWFfMTs",
    authDomain: "agropark-erp.firebaseapp.com",
    projectId: "agropark-erp",
    storageBucket: "agropark-erp.appspot.com",
    messagingSenderId: "309329127919",
    appId: "1:309329127919:web:ce3ff90a181f68bb5bee1a",
    measurementId: "G-3Q4VP7SGFK"
}


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth();
const firebaseStorage = firebaseApp.storage();
const uid = firebaseAuth.currentUser ? firebaseAuth.currentUser.uid : null;
const fs = firebaseApp.firestore();


// Register visitor's browser for push notifications
Pushy.register({ appId: '60d3d019be50e00f1b8f5924' }).then(function (deviceToken) {
    // Print device token to console
    console.log('Pushy device token: ' + deviceToken);

    // Send the token to your backend server via an HTTP GET request
    //fetch('https://your.api.hostname/register/device?token=' + deviceToken);

    // Succeeded, optionally do something to alert the user
}).catch(function (err) {
    // Handle registration errors
    console.error(err);
});

Pushy.setNotificationListener(function (data) {
  // Print notification payload data
  console.log('Received notification: ' + JSON.stringify(data));

  // Attempt to extract the "message" property from the payload: {"message":"Hello World!"}
  let message = data.message || 'Test notification';

  // Display an alert with message sent from server
  alert('Received notification 3: ' + message);
});

// const messaging = firebase.messaging();
// messaging.requestPermission().then(()=> {
//   console.log('I have permission')
//   return messaging.getToken();
// }).then((token)=> {
//   console.log(token)
// })
// .catch((err)=>{
//   console.log(err)


// })

// messaging.onMessage((payload) => {
//   console.log('OnMessage', payload)
//   fcmSnackbar(payload.notification.title, payload.notification.body);
//   //snackbar("success",payload.notification.title, 'top-right');
// })


// messaging.onBackgroundMessage((payload) => {
//   console.log('BGMessage', payload)
// })




//Collections
const domainCollections = fs.collection('domains')
const moduleCategoryCollections = fs.collection('module_categories');
const extensionCategoryCollections = fs.collection('extension_categories');
const activityCollections = fs.collection('activities');
const arrayRemove = firebase.firestore.FieldValue.arrayRemove
const departmentCollections = fs.collection('departments');
const seedBankCollections = fs.collection('seed_banks');
const seedBankCropCategoryCollections = fs.collection('seed_bank_crop_categories');
const unitCollections = fs.collection('units');
const roleCollections = fs.collection('roles');
const userCollections = fs.collection('users');
const moduleCollections = fs.collection('modules');
const extensionCollections = fs.collection('extensions');
const configurationCollections = fs.collection('configurations')
const timestamp = firebase.firestore.FieldValue.serverTimestamp()
const firestoreTimestamp = firebase.firestore.Timestamp;


//CollectionGroups
const requestCollectionGroups = fs.collectionGroup('requests');
const inventoryCollectionGroups = fs.collectionGroup('inventories');

// firebase.analytics();

if (location.hostname === "localhost") {
  console.log("localhost detected!");
  firebaseAuth.useEmulator("http://localhost:9099");
  fs.useEmulator("localhost", 8080);
}

export { 
  firebaseAuth, 
  firebaseStorage,
  firestoreTimestamp,
  fs, 
  uid,
  domainCollections,
  moduleCategoryCollections,
  extensionCategoryCollections,
  activityCollections,
  departmentCollections,
  seedBankCollections,
  seedBankCropCategoryCollections,
  unitCollections,
  roleCollections,
  userCollections,
  moduleCollections,
  extensionCollections,
  configurationCollections,

  requestCollectionGroups,
  inventoryCollectionGroups,
  arrayRemove,
  timestamp 
}



