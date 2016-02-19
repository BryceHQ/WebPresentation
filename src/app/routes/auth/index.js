import SignUp from './components/signUp.jsx';
import SignIn from './components/signIn.jsx';


let Auth = {
  path: 'auth',

  childRoutes: [{
      path: 'signup',
      component: SignUp
    },{
      path: 'signin',
      component: SignIn
    }
  ]
};

export default Auth;
