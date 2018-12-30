import React, { Component } from "react";
import "./menu.scss";
 
class Menu extends Component {
  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }
 
    return (
      <div id="flyoutMenu"
           className={visibility}>
        <h2><a href="#">Search Engine</a></h2>
        <h2><a href="#">Theme</a></h2>
        <h2><a href="#">Help</a></h2>
        <h2><a href="#">Widget</a></h2>
      </div>
    );
  }
}
 
export default Menu;