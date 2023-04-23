import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Routes
import PrivateRoute from './routes/private';

// Scenes
import Form from './scenes/home/index';
import Home from './scenes/auth/index';

function App() {
  return (    
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <PrivateRoute exact path="/submissions" component={Form}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
