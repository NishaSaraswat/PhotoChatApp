
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Pages/LoginPage";
import Home from './Pages/HomePage';
import Registerpage from './Pages/RegisterPage';
import CameraPage from './Pages/CameraPage';
import ImagesPage from './Pages/ImagesPage';
import ProfilePage from './Pages/ProfilePage'


function App() {
  return (
    <div className="App">
      <Router>
        <>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path='/camera' component={CameraPage}/>
              <Route exact path='/images' component={ImagesPage}/>
              <Route exact path='/profile' component={ProfilePage}/>
              <Route exact path='/camera' component={CameraPage}/>
              <Route exact path='/register' component={Registerpage}/>
              <Route exact path='/images' component={ImagesPage}/>

            </Switch>
        </>
        </Router>
    </div>
  );
}

export default App;
