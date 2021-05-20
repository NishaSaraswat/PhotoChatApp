
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import Home from './Pages/HomePage';
<<<<<<< HEAD
import Registerpage from './Pages/RegisterPage';
import CameraPage from './Pages/CameraPage';
=======
import ImagesPage from './Pages/ImagesPage';
>>>>>>> Hille-ShowProfileImage

function App() {
  return (
    <div className="App">
      <Router>
<<<<<<< HEAD
       {/* <h1>Photo Chat App</h1>  */} 
=======
        {/* <h1>Photo Chat App</h1> */}
>>>>>>> Hille-ShowProfileImage
        <>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path='/profile' component={ProfilePage}/>
<<<<<<< HEAD
              <Route exact path='/camera' component={CameraPage}/>
              <Route exact path='/register' component={Registerpage}/>
              
=======
              {/*<Route exact path='/register' component={RegisterUser}/>
              */}
              <Route exact path='/images' component={ImagesPage}/>
>>>>>>> Hille-ShowProfileImage
            </Switch>
        </>
        </Router>
    </div>
  );
}

export default App;
