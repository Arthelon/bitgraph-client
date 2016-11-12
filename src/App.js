import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from './components/NavBar'
import "./index.css"
import "./db"

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
