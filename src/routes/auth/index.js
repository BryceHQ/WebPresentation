import SignUp from './components/signUp';
import SignIn from './components/signIn';


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
