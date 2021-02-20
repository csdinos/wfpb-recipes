import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {config} from '@appRoot/firebase/config'

firebase.initializeApp(config)

export const firestore = firebase.firestore()
export const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)
export const QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

export default firebase
