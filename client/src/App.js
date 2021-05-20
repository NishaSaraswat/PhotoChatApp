
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Pages/LoginPage";
<<<<<<< HEAD
import ProfilePage from './Pages/ProfilePage';
import RegisterPage from './Pages/RegisterPage';
=======
import ProfilePage from "./Pages/ProfilePage";
import Home from './Pages/HomePage';
import Registerpage from './Pages/RegisterPage';
import CameraPage from './Pages/CameraPage';
import ImagesPage from './Pages/ImagesPage';
>>>>>>> d74e35b71b7e97d9167f6effad7c8a7a1f7a9d94

function App() {
  return (
    <div className="App">
      <Router>
        <>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path='/profile' component={ProfilePage}/>
<<<<<<< HEAD
              <Route exact path='/register' component={RegisterPage}/>
              
=======
              <Route exact path='/camera' component={CameraPage}/>
              <Route exact path='/register' component={Registerpage}/>
              <Route exact path='/images' component={ImagesPage}/>
>>>>>>> d74e35b71b7e97d9167f6effad7c8a7a1f7a9d94
            </Switch>
        </>
        </Router>
    </div>
  );
}

export default App;
