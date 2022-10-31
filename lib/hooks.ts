import { auth, firestore } from './firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot, getFirestore, collection, getDocs } from 'firebase/firestore';

// Custom hook to read auth record and user profile doc
export function useUserData() {
    // We can use the useAuthState to get the current state of the signed in user, this listens to the user in firebase and when the user is signed out it will be null.
  // Grab the current user
  const [user] = useAuthState(auth);
    // Initialise state for the username with the useState hook
  const [username, setUsername] = useState(null);

  // Listen to changes to the user object
  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    //  if the user is logged in and exists in firebase
    if (user) {
        const ref = doc(getFirestore(), 'users', user.uid);
        // ref.onSnapshot will return a function which will unsubscribe from the data
        unsubscribe = onSnapshot(ref, (doc) => {
        // the callback function which provides the latest data from the DB, whenever the DB updates, the call back will run with the latest data
        // we can then set the component on the DOC to the username
        // This allows you to listen to real time updates to a doc in firestore
        setUsername(doc.data()?.username);
      });
      // if user doesnt exist, set user to null
    } else {
      setUsername(null);
    }

    // used to tell react to unsubscribewhen the doc is no longer needed
    return unsubscribe;
  }, [user]);

  // used to return an object from the hook which is the current user and username
  return { user, username };
}


export const useGetDocs = (collectionName) => {
  const [documents, setDocuments] = useState([]);

  //Firebase Collection Reference
  const postCollectionRef = collection(getFirestore(), collectionName);

  useEffect(() => {
      const getDocuments = async () => {
          const data = await getDocs(postCollectionRef);
          setDocuments(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      };

      getDocuments();
  }, [getFirestore()]);

  return { documents };
}