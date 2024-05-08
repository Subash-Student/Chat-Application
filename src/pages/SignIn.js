import {Container,Grid,Row,Col,Panel,Button,Icon,Alert} from "rsuite";
import { auth, database } from "../misc/firebase"
import firebase from "firebase/app";


const SignIn = ()=>{


const signInProvider= async(provider)=>{

try {
  const  {additionalUserInfo,user}= await auth.signInWithPopup(provider);
  Alert.success(" Signed In",4000);

if(additionalUserInfo.isNewUser){

await database.ref(`/profile/${user.uid}`).set({
  name: user.displayName,
  createAt :firebase.database.ServerValue.TIMESTAMP
})

}

  

} catch (error) {

  Alert.error(error.message,4000);

}
 

}

const signInWithFacebook=()=>{

  signInProvider(new firebase.auth.FacebookAuthProvider());

}

const signInWithGoogle=()=>{
  
  signInProvider(new firebase.auth.GoogleAuthProvider());
}

return (
  <Container>
    <Grid className="mt-page">
      <Row>
        <Col xs={24} md={12} mdOffset={6}>
        <Panel>
          <div className="text-center">
            <h1>Welcome To Chat</h1>
            <p>Progresive Chat Platform</p>
          </div>


          <div className="mt-3">
            <Button block color = "blue" onClick={signInWithFacebook}>
               <Icon icon ="facebook" /> Continue With Facebook
            </Button>
            <Button block color = "green" onClick={signInWithGoogle}>
               <Icon icon ="google" /> Continue With Google
            </Button>
          </div>
        </Panel>
        </Col>
      </Row>
    </Grid>
  </Container>
)
}

export default SignIn;