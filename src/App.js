import React, { Component } from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom';
import GestaltUIPage from "./Components/GestaltUIPage";
import RowLayoutComponent from './Components/GestaltRowLayoutGalleryComponet/RowLayoutComponent';


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={GestaltUIPage} />
          <Route path="/gallery" component={RowLayoutComponent} />
        </Router>
      </div>
    );
  }
}

export default App;
