import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import BookStore from './components/BookStore';
import CGPACalculator from './components/CGPACalculator';
import ClassRoom from './components/ClassRoom';
import ClassRoomHome from './components/ClassUpdate';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Library from './components/Library';
import MyFollowing from './components/MyFollowingPost';
import Navigationbar from './components/Navigationbar';
import NewPassword from './components/NewPassword';
import Notice from './components/Notice';
import Profile from './components/Profile';
import QuestionBank from './components/QuestionBank';
import { initialState, reducer } from './components/reducer/userReducer';
import Reset from './components/Reset';
import Signin from './components/Signin';
import Signup from './components/Signup';
import SignupConfirmation from './components/SignupConfirmation';
import UserProfile from './components/UserProfile';
import TeacherSignup from './components/TeacherSignup';

export const UserContext = createContext();
const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
      // history.push('/')
    } else if (history.location.pathname.startsWith('/resetpassword')) {
      //if(!history.location.pathname.startsWith('/notice'))
      //history.push('/resetpassword');
    } else if (history.location.pathname.startsWith('/active')) {
    } else {
      history.push('/signin');
    }
  }, []);
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/signin' component={Signin} />
      <Route path='/active/:activeToken' component={SignupConfirmation} />
      <Route path='/signup' component={Signup} />
      <Route path='/teachersignup' component={TeacherSignup} />
      <Route path='/createpost' component={CreatePost} />
      <Route exact path='/profile' component={Profile} />
      <Route path='/myfollowinguser' component={MyFollowing} />
      <Route path='/profile/:userId' component={UserProfile} />
      <Route path='/class/:deptName' component={ClassRoomHome} />
      <Route path='/course/:courseId' component={ClassRoom} />
      <Route path='/reset' component={Reset} />
      <Route path='/resetpassword/:token' component={NewPassword} />
      <Route path='/noticeboard' component={Notice} />
      <Route path='/elibrary' component={Library} />
      <Route path='/bookstore/:dept' component={BookStore} />
      <Route path='/questionbank' component={QuestionBank} />
      <Route path='/cgpacalculator' component={CGPACalculator} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navigationbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
