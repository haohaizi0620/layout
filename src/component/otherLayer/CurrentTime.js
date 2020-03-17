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
       let chartData = this.props.chartData;
        return ( 
            <span className={'textLayer'}
            style={{
              fontSize: chartData&&chartData.fontSize ? chartData.fontSize : '30px',
              fontFamily: chartData&&chartData.fontFamily ? chartData.fontFamily : 'auto',
              color: chartData&&chartData.fontColor ? chartData.fontColor : 'rgba(255,255,255,1)',
              fontWeight: chartData&&chartData.fontWeight ? chartData.fontWeight : 'normal',
              writingMode:chartData&& chartData.writingMode ? chartData.writingMode : 'horizontal-tb'
            }}>{this.state.timeVal}</span>
         );
    }
    componentWillUnmount(){
        clearInterval(this.timeClose);
    }
}
 
export default CurrentTime;