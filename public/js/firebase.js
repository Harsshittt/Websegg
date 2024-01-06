const firebaseConfig = {
  apiKey: "const mySecret = process.env['apiKey']",
  authDomain: "webso-c2049.firebaseapp.com",
  projectId: "webso-c2049",
  storageBucket: "webso-c2049.appspot.com",
  messagingSenderId: "269018676076",
  appId: "1:269018676076:web:a31418372fac3dd44e1149"
};


firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();