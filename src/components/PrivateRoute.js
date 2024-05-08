
import { Redirect, Route } from 'react-router-dom';

 const PrivateRoute = ({children , ...routProps}) => {

    const profile = false;

    if(!profile){
      return  <Redirect to="/SignIn" />
    }


  return (
    <Route {...routProps}>{children}</Route>
  )
}

export default PrivateRoute;