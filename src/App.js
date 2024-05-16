import { Switch } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import  SignIn  from './pages/SignIn';
import  PrivateRoute  from './components/PrivateRoute';
import  PublicRoute  from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import Home from './pages/Home';


function App() {
  return (
  <ProfileProvider>
      <Switch>
        <PublicRoute path="/SignIn">
          <SignIn />
        </PublicRoute>
       <PrivateRoute path="/">
        <Home />
       </PrivateRoute>
      </Switch>
      </ProfileProvider>
  );
}

export default App;
