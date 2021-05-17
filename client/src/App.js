
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Photo Chat App</h1>
        <>
            <Switch>
              <Route exact path="/login" component={Login}/>
              {/* <Route exact path='/profile' component={Profile}/>
              <Route exact path='/register' component={RegisterUser}/>
              */}
            </Switch>
        </>
        </Router>
    </div>
  );
}

export default App;
