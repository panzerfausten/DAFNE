import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom"
import LoginView from './views/auth/LoginView';
import DafneView from './views/dafne/DafneView';
import SettingsView from './views/dafne/SettingsView';

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Route exact path="/" component={ LoginView } />
      <Route exact path="/app" component={ DafneView } />
      <Route exact path="/app/settings" component={ SettingsView } />
    </Router>
  )
  // <Route exact path="/app/:id" component={ DafneView } />

}
export default App;
