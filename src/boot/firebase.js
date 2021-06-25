
import firebase from 'firebase/app'
// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

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



