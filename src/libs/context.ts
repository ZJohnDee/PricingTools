import {createContext} from "react";
import firebase from "firebase/compat/auth";
import {Language} from "./language";

export const UserContext  = createContext({user: null});
export const LanguageContext  = createContext<{language: Language, setLanguage: any}>({
  language: "de",
  setLanguage: null
});
