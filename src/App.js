import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Container>
        {this.props.children}
      </Container>
      </div>
    );
  }
}

export default App;
