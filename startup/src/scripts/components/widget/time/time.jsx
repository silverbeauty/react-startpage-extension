import React, { Component } from 'react';
import './time.scss';

class Time extends Component {
  constructor(props) {
      super(props);
      this.state = {
        ampm: 'AM',
        timeStr: '',
    };
  }
  componentDidMount(){
    var date = new Date();
    var hours = date.getHours();
    var ampm = 'AM';
    if(hours > 11 && hours < 24){
        ampm = 'PM';
    }
    if(hours > 12){
        hours -= 12;
    }
    var mins = date.getMinutes();
    if(mins < 10){
        var txt = '0' + mins;
        mins = txt; 
    }
    var ret = '';
    ret = ret + hours + ':' + mins;
    const timeStr = ret;
    this.setState({ timeStr: timeStr, ampm: ampm});
  }
  render() {
    return (
      <div className="time">
        {this.state.timeStr}
        {this.state.ampm}
      </div>
    );
  }
}

export default Time;
