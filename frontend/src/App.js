import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Posts from './pages/Posts';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Register}/>
        <Route path='/register' Component={Register}/>
        <Route path='/posts' Component={Posts}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
