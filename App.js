import logo from './logo.svg';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import MoviesList from './Components/MoviesList';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact render={(props)=>(
          <>
            <Banner {...props}/>
            <MoviesList {...props}/>
          </>
        )}/>
        <Route path='/favourites' component={Favourite} />
      </Switch>
      {/*<Banner/>
      <MoviesList/>
      <Favourite/>*/}
    </Router>
  );
}

export default App;
