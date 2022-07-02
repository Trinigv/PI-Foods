import './App.css';
import { Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Cards from './Components/Home/Cards';
import Create from './Components/Creation/creation'
import Details from './Components/Home/Details';

function App() {
  return (
    <div className="App">
      <Route exact path='/'> <Landing/> </Route>
      <Route path='/home'> <Cards/>  </Route>
      <Route path='/create'> <Create/> </Route>
      <Route path='/details'> <Details/> </Route>
    </div>
  );
}

export default App;
