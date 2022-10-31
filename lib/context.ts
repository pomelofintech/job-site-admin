import { createContext } from 'react';

// This is used to get the context of the user, this is simialr to the providers file in dart which lets 
// us get the userID of the user from firebase
export const UserContext = createContext({ user:null, username:null });