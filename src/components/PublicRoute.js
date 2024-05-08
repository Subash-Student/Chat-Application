import{Container,Loader} from 'rsuite';
import { Redirect, Route } from 'react-router-dom';
import { useProfile } from '../context/profile.context';

 const PublicRoute = ({children , ...routProps}) => {

    const {profile,isLoading} =useProfile();


    if(isLoading && !profile){
      return (
        <Container>
          <Loader center vertical size ='md' content = 'Loading' speed = 'slow'/>
        </Container>
      )
    }

    if(profile && !isLoading){
      return  <Redirect to="/" />
    }


  return (
    <Route {...routProps}>{children}</Route>
  )
}

export default PublicRoute;