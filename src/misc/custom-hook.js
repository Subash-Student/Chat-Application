import { useCallback, useState,useEffect } from "react"
import { database } from "./firebase";




const useModel = (defaultValue = false) => {

const [ isOpen ,setIsOpen] =useState(defaultValue);

const open = useCallback(()=>setIsOpen(true),[]);
const close = useCallback(()=>setIsOpen(false),[]);

  return {isOpen,open,close}
}

export default useModel;


export const useMediaQuery = query => {
    const [matches, setMatches] = useState(
      () => window.matchMedia(query).matches
    );
  
    useEffect(() => {
      const queryList = window.matchMedia(query);
      setMatches(queryList.matches);
  
      const listener = evt => setMatches(evt.matches);
  
      queryList.addListener(listener);
      return () => queryList.removeListener(listener);
    }, [query]);
  
    return matches;
  };

  export const usePresence = (uid)=>{
     const[presence,setPresence] = useState(null);

     useEffect(()=>{
      const presenceRef = database.ref(`/status/${uid}`);

      presenceRef.on('value',snap =>{
 
       if(snap.exists()){
          
       
        const data = snap.val();
        
        setPresence(data);
       
         
       }
      })
      return ()=>{
        presenceRef.off();
      }
     },[uid]) ;

     return presence
  } 