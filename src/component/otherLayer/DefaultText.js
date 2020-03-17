import React, { Component } from 'react';
class DefaultText extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            timeVal:''
         }
    }

    render() { 
       let chartData = this.props.chartData;
        return ( 
                chartData&&chartData.hyperlinkCenter
                ?<DefaultLinkText/>
                :<DefaultSpanText/>
         );
    }
}

class DefaultSpanText extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
       let chartData = this.props.chartData;
        return ( 
            <span
                      className={'textLayer'}
                      src={chartData&&chartData.hyperlinkCenter ? chartData.hyperlinkCenter : ''}
                      target={chartData&&chartData.isNewWindow ? '_blank' : '_self'}
                      style={{
                        fontSize: chartData&&chartData.fontSize ? chartData.fontSize : '30px',
                        fontFamily: chartData&&chartData.fontFamily ? chartData.fontFamily : 'auto',
                        color: chartData&&chartData.fontColor ? chartData.fontColor : 'rgba(255,255,255,1)',
                        fontWeight: chartData&&chartData.fontWeight ? chartData.fontWeight : 'normal',
                        writingMode:chartData&& chartData.writingMode ? chartData.writingMode : 'horizontal-tb'
                      }}>
                      {chartData&&chartData.textCenter ? chartData.textCenter : '标题'}</span>
         );
    }
}
class DefaultLinkText extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
       let chartData = this.props.chartData;
        return ( 
            <a
                      className={'textLayer'}
                      src={chartData&&chartData.hyperlinkCenter ? chartData.hyperlinkCenter : ''}
                      target={chartData&&chartData.isNewWindow ? '_blank' : '_self'}
                      style={{
                        fontSize: chartData&&chartData.fontSize ? chartData.fontSize : '30px',
                        fontFamily: chartData&&chartData.fontFamily ? chartData.fontFamily : 'auto',
                        color: chartData&&chartData.fontColor ? chartData.fontColor : 'rgba(255,255,255,1)',
                        fontWeight: chartData&&chartData.fontWeight ? chartData.fontWeight : 'normal',
                        writingMode:chartData&& chartData.writingMode ? chartData.writingMode : 'horizontal-tb'
                      }}>
                      {chartData&&chartData.textCenter ? chartData.textCenter : '标题'}</a>
         );
    }
}
export default DefaultText;