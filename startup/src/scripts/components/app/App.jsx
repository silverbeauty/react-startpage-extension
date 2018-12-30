import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.scss';

import Weather from '../widget/weather/weather';
import SearchBar from '../widget/search-bar/search-bar';
import Time from '../widget/time/time';
import SettingSidebarContainer from '../layout/setting-sidebar-container/setting-sidebar-container';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'ADD_COUNT'
      });
    });
  }

  render() {
    return (
      <div className="App">
          <SettingSidebarContainer/>
          Click Count: {this.props.count}
          <SearchBar></SearchBar>
          <Weather></Weather>
          <Time></Time>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
