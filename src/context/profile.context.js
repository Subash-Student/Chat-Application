import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";
import firebase from 'firebase/app'

export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};



const profileContext =createContext();

export const ProfileProvider = ({children})=>{

    const[profile,setProfile]=useState(null);
    const[isLoading,setIsLoading] = useState(true);

    useEffect(()=>{

        let useRef;
        let userStatusRef;

       const authUnSub = auth.onAuthStateChanged(authObj =>{
            if(authObj){
                 userStatusRef = database.ref(`/status/${authObj.uid}`);
                 useRef =  database.ref(`/profile/${authObj.uid}`)
                 useRef.on('value',snap =>{
                    const {name , createAt,avatar} = snap.val();
                
                    const data ={
                        name,
                        avatar,
                        createAt,
                        uid : authObj.uid,
                        email : authObj.email
                    };

                    setProfile(data);
                    setIsLoading(false);
                   })

     database.ref('.info/connected').on('value', (snapshot)=> {

    if (!!snapshot.val() === false) {
        return;
    };

   
    userStatusRef.onDisconnect().set(isOfflineForDatabase).then(() =>{ 
        userStatusRef.set(isOnlineForDatabase);
    });
});
                
            }else{
                 setProfile(null);
                 setIsLoading(false);

                 if(useRef){
                    useRef.off()
                 }
                 if(userStatusRef){
                    userStatusRef.off()
                 }
            }
        })

        return ()=>{
            authUnSub();

            if(useRef){
                useRef.off()
             }  
             if(userStatusRef){
                    userStatusRef.off()
                 }
        }
    },[])



    return(
<profileContext.Provider value={{profile,isLoading}}>
    {children}
</profileContext.Provider>
    )
}

export const useProfile = ()=> useContext(profileContext);


