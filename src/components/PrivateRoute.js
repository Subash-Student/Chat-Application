
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';

export const PrivateRoute = ({children , ...routProps}) => {

    const profile = false;

    if(!profile){
      return  <Redirect to="/SignIn" />
    }


  return (
    <Route {...routProps}>{children}</Route>
  )
}
