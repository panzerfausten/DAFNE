import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom"
import LoginView from './views/auth/LoginView';
import DafneView from './views/dafne/DafneView';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Route exact path="/" component={ LoginView } />
      <Route exact path="/app" component={ DafneView } />
    </Router>
  )

}
export default App;
