import './App.css';
import React from 'react';
import { HashRouter, Switch, Route,Link } from "react-router-dom";
import LinkList from "./components/list/LinkList";
import "bootstrap/dist/css/bootstrap.min.css";
import '@progress/kendo-theme-material/dist/all.css';
import CreateLinkPage from './components/link/CreateLinkPage';
import LinkContextProvider from "./components/contexts/LinkContext";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    
    <div className="App">
     <nav className="navbar navbar-expand navbar-light " style={{backgroundColor: "#e3f2fd"}}>
      <div className="navbar-nav">
          <li className="nav-item">
               <p style={{fontSize:"20px"}}><b>Link</b>VOTE </p>  
          </li>
     </div>
     </nav>
          <div className="container mt-3">
            <LinkContextProvider>
              <HashRouter>
                <Switch>
                  <Route exact path="/" component={LinkList} />
                  <Route path="/createlink" component={CreateLinkPage} />
                </Switch>
              </HashRouter>
          </LinkContextProvider>
        </div>
    </div>
  );
}

export default App;
