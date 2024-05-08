
import { Redirect, Route } from 'react-router-dom';
import { useProfile } from '../context/profile.context';

 const PrivateRoute = ({children , ...routProps}) => {

    const {profile,isLoading} = useProfile();





    if(!profile){
      return  <Redirect to="/SignIn" />
    }


  return (
    <Route {...routProps}>{children}</Route>
  )
}

export default PrivateRoute;