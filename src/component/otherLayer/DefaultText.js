/*
 * @Author: your name
 * @Date: 2020-03-13 17:19:16
 * @LastEditTime: 2020-03-19 15:10:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\DefaultText.js
 */
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
                ?<DefaultLinkText  chartData={chartData}  />
                :<DefaultSpanText  chartData={chartData}  />
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
            <div
                      className={'textLayer'}
                      style={{
                        height:'100%',
                        width:'100%',
                        textIndent: '32px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        fontSize: chartData&&chartData.fontSize ? chartData.fontSize : '30px',
                        fontFamily: chartData&&chartData.fontFamily ? chartData.fontFamily : 'auto',
                        color: chartData&&chartData.fontColor ? chartData.fontColor : 'rgba(255,255,255,1)',
                        fontWeight: chartData&&chartData.fontWeight ? chartData.fontWeight : 'normal',
                        writingMode:chartData&& chartData.writingMode ? chartData.writingMode : 'horizontal-tb'
                      }}>
                      {chartData&&chartData.textCenter&&chartData.textCenter.value ? chartData.textCenter.value : '标题'}</div>
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
                      {chartData&&chartData.textCenter&&chartData.textCenter.value ? chartData.textCenter.value : '标题'}</a>
         );
    }
}
export default DefaultText;