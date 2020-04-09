/*
 * @Author: your name
 * @Date: 2020-03-13 17:19:16
 * @LastEditTime: 2020-03-26 19:36:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\SingleImage.js
 */
import React, { Component } from 'react';
class DecorateLayer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    render() { 
       let {decorateImage}  = this.props.layerData;
        return ( 
            <div
            style={{
              height:'100%',
              width:'100%',
              backgroundImage: `url(${require("../../../img/" + decorateImage)})`,
              imageRendering: '-webkit-optimize-contrast',
              backgroundSize: '100% 100%'
            }}>
            </div>
         );
    }
}

export default DecorateLayer;