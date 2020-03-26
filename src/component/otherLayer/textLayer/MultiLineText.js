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
       let layerData = this.props.layerData;
       let timeKey = this.props.timeKey;
        return ( 
            <div
            id={timeKey}
            style={{
                width: '100%',
                height: '100%',
                fontSize: layerData&&layerData.fontSize ? layerData.fontSize : '30px',
                fontFamily: layerData&&layerData.fontFamily ? layerData.fontFamily : 'auto',
                color: layerData&&layerData.fontColor ? layerData.fontColor : 'rgba(255,255,255,1)',
                fontWeight: layerData&&layerData.fontWeight ? layerData.fontWeight : 'normal',
                textIndent: '32px',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                overflow: 'hidden',
            }}
            >
            {layerData&&layerData.textCenter&&layerData.textCenter.value ? layerData.textCenter.value : '标题'}</div>
         );
    }
   
}
 
export default MultiLineText;