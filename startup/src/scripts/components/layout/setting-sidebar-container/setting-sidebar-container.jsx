import React, { Component } from "react";
import './setting-sidebar-container.scss';

import Menu from "./menu/menu";
import SettingButton from "../setting-button/setting-button";

class SettingSidebarContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          visible: false
        };       
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
      }
      handleMouseDown(e) {
        this.toggleMenu();    
        console.log("clicked");
        e.stopPropagation();
      }
      toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
      }
    render() {
        return (
            <div className="setting-sidebar-container">
                <SettingButton handleMouseDown={this.handleMouseDown}/>
                <Menu handleMouseDown={this.handleMouseDown}
                menuVisibility={this.state.visible}/> 
            </div>
        );
    }
}

export default SettingSidebarContainer;