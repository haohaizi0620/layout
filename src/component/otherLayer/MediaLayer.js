/*
 * @Author: your name
 * @Date: 2020-03-20 09:37:00
 * @LastEditTime: 2020-03-26 16:30:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\TextLayer.js
 */
import React, { Component } from 'react';
import IframeLayer from './mediaLayer/IframeLayer';
import SingleImage from './mediaLayer/SingleImage';
import SingleVideo from './mediaLayer/SingleVideo';
class MediaLayer extends Component {
    static defaultProps = {
        layerData : {},
        layerSinId : "",
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
       let {layerData,layerSinId} = this.props;
       if(layerSinId==="iframeCenter"){
        return (
            <IframeLayer layerData={layerData}/>
        )
       }else if(layerSinId==="singleImage"){
        return (
            <SingleImage layerData={layerData}  />
        )
       }else if(layerSinId==="singleVideo"){
           return (
               <SingleVideo layerData={layerData}  />
           )
       }else{
        return null;
       }
    }

}

export default MediaLayer;