/*
 * @Author: your name
 * @Date: 2020-03-13 16:27:45
 * @LastEditTime: 2020-03-26 16:30:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\textLayer\CurrentTime.js
 */
import React, { Component } from 'react';
class CurrentTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeVal:''
         }
    }
    componentDidMount(){
      this.currentTime();
    }
    currentTime() {
        let _this = this;
        _this.timeClose = setInterval(() => {
          var date = new Date();
          this.year = date.getFullYear();
          this.month = date.getMonth() + 1;
          this.date = date.getDate();
          this.day = new Array(
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六"
          )[date.getDay()];
          this.hour =
            date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
          this.minute =
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
          this.second =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
          this.setState({
            timeVal: this.nextTimeTitle = this.year + "/" + this.month + "/" + this.date+"    "+this.hour + ":" + this.minute + ":" + this.second,
          })
        }, 1000);
    };
    render() {
       let layerData = this.props.layerData;
        return (
            <span className={'textLayer'}
            style={{
              backgroundColor:layerData.backgroundColor,
              fontSize: layerData&&layerData.fontSize ? layerData.fontSize : '30px',
              fontFamily: layerData&&layerData.fontFamily ? layerData.fontFamily : 'auto',
              color: layerData&&layerData.fontColor ? layerData.fontColor : 'rgba(255,255,255,1)',
              fontWeight: layerData&&layerData.fontWeight ? layerData.fontWeight : 'normal',
              writingMode:layerData&& layerData.writingMode ? layerData.writingMode : 'horizontal-tb'
            }}>{this.state.timeVal}</span>
         );
    }
    componentWillUnmount(){
        clearInterval(this.timeClose);
    }
}

export default CurrentTime;