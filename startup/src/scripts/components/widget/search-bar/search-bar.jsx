import React, { Component } from 'react';
import './search-bar.scss';

class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar">
          <form method="get" action="http://www.google.com/search">
              <div>
                  <table cellPadding="0">
                      <tbody>
                          <tr>
                              <td>
                                  <input className="input" type="text"  name="q" size="25"
                                         maxLength="255"></input>                             
                                  <button type="submit"><i className="material-icons">search</i></button>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </form>
      </div>
    );
  }
}

export default SearchBar;
