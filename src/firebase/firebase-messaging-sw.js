// importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js")
// importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js")

// // import firebase from 'firebase/app'
// // import 'firebase/auth'
// // import 'firebase/firestore'
// // import 'firebase/storage'
// // import 'firebase/messaging'





// var firebaseConfig = {
//     apiKey: "AIzaSyAvvHd4hsC_EoDzSJu-KfrUBrmiRWFfMTs",
//     authDomain: "agropark-erp.firebaseapp.com",
//     projectId: "agropark-erp",
//     storageBucket: "agropark-erp.appspot.com",
//     messagingSenderId: "309329127919",
//     appId: "1:309329127919:web:ce3ff90a181f68bb5bee1a",
//     measurementId: "G-3Q4VP7SGFK"
// }


// // Initialize Firebase
// firebase.initializeApp(firebaseConfig)

// const messaging = firebase.messaging();
// console.log('background .........................bbbbbbbb')
// messaging.onBackgroundMessage((payload) => {
//     console.log('Background Message', payload)
//     const title ="Hello world";
//     const options = {
//         body: payload.data.status,
//     }
    
//     return self.registration.showNotification(title, options)
// })