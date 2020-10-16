/*
 * @Author: your name
 * @Date: 2020-03-20 09:37:00
 * @LastEditTime: 2020-03-26 16:30:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\TextLayer.js
 */
import React, { Component } from 'react';
import DecorateLayer from './materialLayer/DecorateLayer';
import IconLayer from './materialLayer/IconLayer';
class MaterialLayer extends Component {
    static defaultProps = {
        layerData : {},
        layerSinId : "",
        timeKey : ""
    }

    constructor(props) {
        super(props);
        this.state = {
         }
    }
    render() {
       let {layerData,layerSinId} = this.props;
       if(layerSinId==="singleDecorate"){
        return (
            <DecorateLayer  layerData={layerData} />
        )
       }else if(layerSinId === "singleIcon"){//图标
           return (
               <IconLayer  layerData={layerData} />
           )
       }else{
         return null
       }
    }

}

export default MaterialLayer;