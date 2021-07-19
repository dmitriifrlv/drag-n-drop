import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Kanban from './Components/Kanban.jsx';
import Mix from './Components/Mix.jsx'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      {/* <ul className="nav">
      <Link to="/kanban">Kanban</Link>
      <Link to="/mix">Mix</Link>
      </ul> */}
      <Switch>
        <Route exact path='/kanban' component={Kanban}/>
        <Route exact path='/mix' component={Mix}/>
      </Switch>
      </BrowserRouter>
          </div>
  );
}

export default App;
