/*
 * @Author: your name
 * @Date: 2020-03-13 17:19:16
 * @LastEditTime: 2020-03-25 18:57:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\SingleImage.js
 */
import React, { Component } from 'react';
class SingleImage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    render() { 
       let chartData = this.props.chartData;
       let urlConfig = chartData.urlConfig;
        return ( 
            <div
            style={{
              height:'100%',
              width:'100%',
              backgroundImage: `url(${chartData.backgroundImage})`,
              borderRadius: `${chartData.radius}px`,
              backgroundRepeat: chartData.repeat,
              imageRendering: '-webkit-optimize-contrast',
              backgroundSize: '100% 100%'
            }}>
              <a  
                src={urlConfig.url ? urlConfig.url : ''}
                target={urlConfig.ifBlank ? '_blank' : '_self'}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%'
              }} />
            </div>
         );
    }
}

export default SingleImage;