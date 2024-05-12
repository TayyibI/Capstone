import { create } from 'zustand'
import { doc, setDoc,getDoc } from "firebase/firestore"; 
import { firebaseDb } from './firebase';

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading:true,
  fetchUserInfo: async(uid) =>{
    if(!uid) return set({currentUser:null,isLoading:false});
    
    try {
        const docRef = doc(firebaseDb, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            set({currentUser:docSnap.data(),isLoading:false});
        }
        else{
            set({currentUser:null,isLoading:false});
        }
    } catch (error) {
        console.log("Some error occured: ",error.message);
        return set({currentUser:null,isLoading:false});
    }
  }
}))