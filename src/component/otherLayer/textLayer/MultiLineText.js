/*
 * @Author: your name
 * @Date: 2020-03-20 09:44:03
 * @LastEditTime: 2020-03-20 09:48:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\textLayer\MultiLineText.js
 */
import React, { Component } from 'react';
class MultiLineText extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    render() { 
       let chartData = this.props.chartData;
       let timeKey = this.props.timeKey;
        return ( 
            <div
            id={timeKey}
            style={{
                width: '100%',
                height: '100%',
                fontSize: chartData&&chartData.fontSize ? chartData.fontSize : '30px',
                fontFamily: chartData&&chartData.fontFamily ? chartData.fontFamily : 'auto',
                color: chartData&&chartData.fontColor ? chartData.fontColor : 'rgba(255,255,255,1)',
                fontWeight: chartData&&chartData.fontWeight ? chartData.fontWeight : 'normal',
                textIndent: '32px',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                overflow: 'hidden',
            }}
            >
            {chartData&&chartData.textCenter&&chartData.textCenter.value ? chartData.textCenter.value : '标题'}</div>
         );
    }
   
}
 
export default MultiLineText;