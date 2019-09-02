import React from 'react';
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter, Route } from 'react-router-dom';
import Users from './components/Users'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          {/* <Link to='/login'> Login</Link>
          <Link to='/home'> Home</Link> */}
          
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} exact/>
          <Route path='/users' component={Users} exact/>
      </div>
    </BrowserRouter>
  );
}

export default App;
