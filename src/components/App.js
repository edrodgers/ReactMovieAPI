import React, { Component } from 'react';
import Nav from './Nav';
import SearchBox from './SearchBox'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
				<SearchBox />
      </div>
    );
  }
}

export default App;
