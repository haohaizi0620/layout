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
import LiquidLayer from './materialLayer/LiquidLayer';
import GaugeLayer from './materialLayer/GaugeLayer';
import RingProgressLayer  from './materialLayer/RingProgressLayer';
import BarProgressLayer  from './materialLayer/BarProgressLayer';
import RadialBarLayer  from './materialLayer/RadialBarLayer';
import RoseLayer  from './materialLayer/RoseLayer';
import WaterLevelPond  from './materialLayer/WaterLevelPondLayer';

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
       }else if(layerSinId === "singleLiquid"){//水波球
           return (
               <LiquidLayer  layerData={layerData} />
           )
       }else if(layerSinId === "singleGauge"){//仪表盘
           return (
               <GaugeLayer  layerData={layerData} />
           )
       }else if(layerSinId === "singleRingProgress"){//进度环
           return (
               <RingProgressLayer  layerData={layerData} />
           )
       }else if(layerSinId === "singleBarProgress"){//进度条
           return (
               <BarProgressLayer  layerData={layerData} />
           )
       }else if(layerSinId === "singleRadialBar"){//玉珏图
           return (
               <RadialBarLayer  layerData={layerData} />
           )
       }else if(layerSinId === "singleRose"){//玫瑰图
           return (
               <RoseLayer  layerData={layerData} />
           )
       }else if(layerSinId === "waterLevelPond"){//水位图
           return (
               <WaterLevelPond  layerData={layerData} />
           )
       }else{
         return null
       }
    }

}

export default MaterialLayer;