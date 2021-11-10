import Header from './component/header.js';
import './App.css';
import Login from './component/Login.js';
import Footer from './component/footer';
import Addclient from './component/addclient';
import Client from './component/client';
import Account from './component/account';
import Search from './component/search';
import EmptyAccount from './component/emptyAccount';
import EmptyClient from './component/emptyClient' ;


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
    <Router>
      
        <Switch>
          <Route exact path="/">
            <Addclient />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/client">
            <Client />
          </Route>
          <Route path="/emptyClient">
            <EmptyClient />
          </Route>
          
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/emptyAccount">
            <EmptyAccount />
          </Route>
          
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
        </Router>
        <Footer/>

    </div>
  );
}

export default App;
