import './App.css';
import { Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Home from './Components/Home/Home';
import Create from './Components/Creation/creation'
import Details from './Components/Home/Details';

function App() {
  return (
    <div className="App">
      <Route exact path='/'> <Landing/> </Route>
      <Route path='/home'> <Home/>  </Route>
      <Route path='/create'> <Create/> </Route>
      {/*<Route path='/details'> <Details/> </Route>*/}
      <Route path='/detail/:id' component={Details}/>
    </div>
  );
}

export default App;
