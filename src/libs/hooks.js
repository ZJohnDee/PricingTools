import { useEffect, useState } from 'react';

import { auth, firestore } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";


export function useUserData()
{

  const [user] = useAuthState(auth);


  useEffect(() => {
    let unsubscribe;

    if (user)
    {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) =>
      {

      });
    } else
    {

    }

    return unsubscribe;
  }, [user]);


  return { user };
}

