import './App.css';
import { Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Cards from './Components/Home/Cards';
import Create from './Components/Creation/creation'

function App() {
  return (
    <div className="App">
      <Route exact path='/'> <Landing/> </Route>
      <Route path='/home'> <Cards/>  </Route>
      <Route path='/create'> <Create/> </Route>
    </div>
  );
}

export default App;
