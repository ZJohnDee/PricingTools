import { useEffect } from "react"
import { auth, firestore } from "../../libs/firebase"

export default (props: any) => {
  useEffect(() => {
    firestore.collection("users").doc(auth.currentUser?.uid).get();
  });


  return <></>
}