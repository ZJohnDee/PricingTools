import {createContext} from "react";
import firebase from "firebase/compat/auth";

export const UserContext  = createContext({user: null});
