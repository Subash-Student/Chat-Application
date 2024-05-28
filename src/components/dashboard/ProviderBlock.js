import {Tag,Button,Icon,Alert} from 'rsuite';
import { auth} from '../../misc/firebase'
import { useState } from 'react';
import firebase from "firebase/app";


const ProviderBlock = () => {

    const [isConnect, setIsConnect] = useState({
        'google.com': auth.currentUser?.providerData?.some(
          data => data.providerId === 'google.com'
        ),
        'facebook.com': auth.currentUser?.providerData?.some(
          data => data.providerId === 'facebook.com'
        ),
      });

const updateIsConnect =(providerId,value)=>{
    setIsConnect(p =>{
        return {
            ...p,
            [providerId] :value,
        }
    })

}


const unLink= async(provider)=>{

    try {
        if(auth.currentUser.providerData.length === 1){
            throw new Error ('You Cannot Disconnect')
        }
          
       await auth.currentUser.unlink(provider);
        updateIsConnect(provider,false);
        Alert.info(`You Are Disconnected From ${provider}`);

    } catch (error) {
        Alert.error(error.message);
    }

}

const signInProvider= async(provider)=>{

    try {
     await auth.signInWithPopup(provider);
      Alert.success(" Signed In",4000);
      updateIsConnect(provider.providerId, true);
    } catch (error) {
      Alert.error(error.message,4000);
    }
    }


const unLinkFacebook =()=>{
unLink("facebook.com");
};

const unLinkGoogle =()=>{
    unLink("google.com");
};

const LinkFacebook =()=>{
    signInProvider(new firebase.auth.FacebookAuthProvider());
}

const LinkGoogle =()=>{
    signInProvider(new firebase.auth.FacebookAuthProvider());
}





  return (
    <div>
        {isConnect['google.com'] &&
          <Tag color="green" closable onClose={unLinkGoogle}>
             <Icon icon="google"/> Connected
          </Tag>
        }

         {isConnect['facebook.com'] &&
         <Tag color="blue" closable onClose={unLinkFacebook}>
             <Icon icon="facebook"/> Connected
        </Tag>
         }

<div className='mt-3'>

    {!isConnect['google.com'] && 
     <Button block color='green' onClick={LinkGoogle}>
         <Icon icon='google'/> Connect To Google
    </Button>
    }
   
      {!isConnect['facebook.com'] && 
       <Button block color='blue' onClick={LinkFacebook}>
          <Icon icon='facebook'/>  Connect To FaceBook
     </Button>
  
      }
   

</div>

    </div>
    
   
    
  )
}

export default ProviderBlock
