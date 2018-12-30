import React, { Component } from "react";
import './setting-button.scss'; 

class SettingButton extends Component {
    render() {
      return (
        <button className="setting-button"
                onMouseDown={this.props.handleMouseDown}>
                <i className="material-icons">
                settings
                </i></button>
      );
    }
  }

export default SettingButton;