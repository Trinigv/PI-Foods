import './App.css';
import { Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Cards from './Components/Home/Recipes';
//import SearchBar from './Components/Home/SearchBar';

function App() {
  return (
    <div className="App">
      <Route exact path='/'> <Landing/> </Route>
      <Route path='/recipes'> <Cards/>  </Route>
    </div>
  );
}

export default App;
