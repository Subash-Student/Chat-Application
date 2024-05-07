
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';

export const PublicRoute = ({children , ...routProps}) => {

    const profile = false;

    if(!profile){
      return  <Redirect to="/" />
    }


  return (
    <Route {...routProps}>{children}</Route>
  )
}