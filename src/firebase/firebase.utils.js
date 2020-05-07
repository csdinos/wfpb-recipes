import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCn70l1JUbTHSC5UfxP2sWXLH31Oifu01o",
  authDomain: "wfpb-recipes-ffffe.firebaseapp.com",
  databaseURL: "https://wfpb-recipes-ffffe.firebaseio.com",
  projectId: "wfpb-recipes-ffffe",
  storageBucket: "wfpb-recipes-ffffe.appspot.com",
  messagingSenderId: "830709300790",
  appId: "1:830709300790:web:36038cfefef7f924766297",
  measurementId: "G-H1VH96ER9M"
};

firebase.initializeApp(config)

export const firestore = firebase.firestore
export const auth = firebase.auth

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
