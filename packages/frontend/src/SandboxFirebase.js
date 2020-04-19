import firebase from 'firebase';
import { Collections } from '@pdf-sandbox/lib';

import 'firebase/storage';
import FIREBASE_CONFIG from './.config.firebase.js'

const Firebase = firebase.initializeApp(FIREBASE_CONFIG);

export { Collections };

if (process.env.NODE_ENV === 'development') {
  (Firebase.functions()._url = function(name) {
    return `http://localhost:5001/${FIREBASE_CONFIG.projectId}/us-central1/${name}`;
  })
}

export default Firebase;