import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";


const profileContext =createContext();

export const ProfileProvider = ({children})=>{

    const[profile,setProfile]=useState(null);
    const[isLoading,setIsLoading] = useState(true);

    useEffect(()=>{

        let useRef;

       const authUnSub = auth.onAuthStateChanged(authObj =>{
            if(authObj){

                 useRef =  database.ref(`/profile/${authObj.uid}`)
                 useRef.on('value',snap =>{
                    const {name , createdAt} = snap.val();

                    const data ={
                        name,
                        createdAt,
                        uid : authObj.uid,
                        email : authObj.email
                    };

                    setProfile(data);
                    setIsLoading(false);
                   })
                
            }else{
                 setProfile(null);
                 setIsLoading(false);

                 if(useRef){
                    useRef.off()
                 }
            }
        })

        return ()=>{
            authUnSub();

            if(useRef){
                useRef.off()
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


