/*
 * @Author: your name
 * @Date: 2020-03-13 17:19:16
 * @LastEditTime: 2020-03-20 10:46:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\SingleRowText.js
 */
import React, { Component } from 'react';
class SingleRowText extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    render() { 
       let chartData = this.props.chartData;
        return ( 
            <div
            style={{
              height:'100%',
              width:'100%',
              textOverflow: 'clip',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              fontSize: chartData&&chartData.fontSize ? chartData.fontSize : '30px',
              fontFamily: chartData&&chartData.fontFamily ? chartData.fontFamily : 'auto',
              color: chartData&&chartData.fontColor ? chartData.fontColor : 'rgba(255,255,255,1)',
              fontWeight: chartData&&chartData.fontWeight ? chartData.fontWeight : 'normal',
              writingMode:chartData&& chartData.writingMode ? chartData.writingMode : 'horizontal-tb'
            }}>
                {
                    chartData&&chartData.hyperlinkCenter
                    ?<a src={chartData&&chartData.hyperlinkCenter ? chartData.hyperlinkCenter : ''}
                        className={'textLayer'}
                        target={chartData&&chartData.isNewWindow ? '_blank' : '_self'}>
                        {chartData&&chartData.textCenter&&chartData.textCenter.value ? chartData.textCenter.value : '标题'}
                        </a>
                    :chartData&&chartData.textCenter&&chartData.textCenter.value ? chartData.textCenter.value : '标题'
                }
            </div>
         );
    }
}

export default SingleRowText;