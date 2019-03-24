import React, { Component } from 'react';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom';

import Dashboard from './components/Dashboard'
import Page from './components/Page'
import Addpost from './components/Addpost'

class App extends Component {
  state = {
    data: [],
    postsatus: true,
    submitted: false
  }

  componentDidMount(){
    
  }

  
   
  render() {
    return (
      //<BrowserRouter>
      <div>
        <div className="hero is-primary is-fixed">
          <div className="container">
            <nav className="navbar" role="navigation" aria-label="main navigation">

              <div className="navbar-brand">
                <a className="navbar-item" href="/">
                  <img src="https://pngimage.net/wp-content/uploads/2018/06/sport-logo-png-3.png" width="112" height="28" />
                </a>
              </div>

              <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                  <Link to="/" className="navbar-item ">
                    Dashboard
                  </Link>
                  <Link to="/addpost" className="navbar-item ">
                    <button className="button is-link is-inverted">Add Post +</button>
                  </Link>
                </div>
              </div>

            </nav>
          </div>
        </div>
        <Route exact path="/" component={Dashboard}></Route>
        <Route path="/post/:id" component={Page}></Route>
        <Route path="/addpost" component={Addpost}></Route>
        </div>
      //</BrowserRouter>
    );
  }
}

export default withRouter(App);
