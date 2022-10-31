import { initializeApp, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDa5wL3n18-Dgc8EliY4Q8tuAbP_03aNM",
  authDomain: "job-app-7d3f8.firebaseapp.com",
  projectId: "job-app-7d3f8",
  storageBucket: "job-app-7d3f8.appspot.com",
  messagingSenderId: "50081894255",
  appId: "1:50081894255:web:4957024ec329e0aaa9629a",
  measurementId: "G-7SPEY5NV3F"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID
// };

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

// const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
// export const auth = firebase.auth();
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);

// Storage exports
export const storage = getStorage(firebaseApp);

// Firebase analytics
// const analytics = getAnalytics(firebaseApp);

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  // query the username doc but only retrun one which matches.
  const q = query(
    collection(firestore, "users"),
    where("username", "==", username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

/**`
 * Gets a jobAdvert/{uid} document based on job advert
 * @param  {string} username
 */
export async function getCompanyDetailsWithJobAdvert(companyDetailsID) {
  console.log('testy ' + companyDetailsID);
  const noteSnapshot = await getDoc(
    doc(getFirestore(), "companyDetails", companyDetailsID)
  );
  console.log('big testy ' + noteSnapshot);

  if (noteSnapshot.exists()) {
    return noteSnapshot.data();
  } else {
    return "could not get company details";
  }
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    // timeAddedToFavourites: data.timeAddedToFavourites.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
    // createdAt: data.createdAt.toMillis(),
  };
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postDocToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
  };
}
