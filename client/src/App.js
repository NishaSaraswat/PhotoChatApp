
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Pages/LoginPage";
import ProfilePage from './Pages/ProfilePage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Photo Chat App</h1>
        <>
            <Switch>
              <Route exact path="/login" component={Login}/>
              <Route exact path='/profile' component={ProfilePage}/>
              <Route exact path='/register' component={RegisterPage}/>
              
            </Switch>
        </>
        </Router>
    </div>
  );
}

export default App;
