/*
 * @Author: your name
 * @Date: 2020-02-19 09:56:36
 * @LastEditTime: 2020-03-20 18:36:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\ShowContent.js
 */
import React, { Component, Fragment } from 'react'
import './Content.css';
import CurrentTime from './otherLayer/textLayer/CurrentTime';
import SingleRowText from './otherLayer/textLayer/SingleRowText';
import IframeLayer from './otherLayer/IframeLayer';
import TextLayer from "./otherLayer/TextLayer";
class Child1 extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var cptObj = this.props.cptObj;
        let tempLayerType = cptObj.type;
        let cptBorderObj = cptObj.cptBorderObj;
        let chartData = this.props.chartData.layerData;
        let keyData = this.props.keyData;
        let layerSinId = keyData.id;    
        let timeKey = this.props.id;
        let existTypes = ["text", "0", "1"]; //border，iframe,table
        {
            return (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderWidth:tempLayerType == 'border'?chartData.borderWidth+"px":'0px',
                        borderStyle:tempLayerType == 'border'?'solid':'none',
                        borderImage:tempLayerType == 'border'?`url(${require("../img/"+chartData.borderImage)}) 30`:'none'
                    }} 
                    >
                        {tempLayerType == "text" ? (
                            <TextLayer
                            timeKey={timeKey}
                            chartData={chartData}
                            layerSinId={layerSinId}
                            />
                        ) : null}
                   {//存放图表和地图的dom
                        tempLayerType == "0" || tempLayerType == "1" ? (
                            <div
                            id={timeKey}
                            className="singleChart"
                            style={{
                                position: "absolute",
                                width: cptBorderObj.width + "px",
                                height: cptBorderObj.height + "px",
                                textAlign:
                                tempLayerType == "text" && chartData
                                    ? chartData.textAlign
                                    ? chartData.textAlign
                                    : ""
                                    : ""
                            }}
                            ></div>
                        ) : null}
                        {//当前类型没有在上面添加判断的话都进到这个里面
                        !existTypes.includes(tempLayerType) ? (
                            <div
                            id={timeKey}
                            style={{
                                width: "100%",
                                height: "100%",
                                textAlign: chartData
                                ? chartData.textAlign
                                    ? chartData.textAlign
                                    : ""
                                : ""
                            }}
                            >
                            {tempLayerType == "iframe" ? ( <IframeLayer chartData={chartData} /> ) : null}
                            </div>
                        ) : null}
                </div>
            )
        }
    }
}


class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cptBorderObj: this.props.cptObj.cptBorderObj,
        };
    }


    render() {
        let cptObj = this.props.cptObj;
        let cptBorderObj = cptObj.cptBorderObj;
        return (
            <div className="grid-item"
                style={{
                    opacity: cptBorderObj.opacity,
                    left: cptBorderObj.left,
                    top: cptBorderObj.top,
                    width: parseInt(cptBorderObj.width),
                    height: parseInt(cptBorderObj.height),
                    transform:`rotate(${cptBorderObj.rotate}deg)`,
                    borderStyle: cptBorderObj.layerBorderStyle,
                    borderWidth: cptBorderObj.layerBorderWidth + 'px',
                    borderColor: cptBorderObj.layerBorderColor,
                }}>
                <Child1
                    cptObj={cptObj}
                    chartData={this.props.chartData}
                    keyData={this.props.keyData}
                    id={this.props.id}>
                </Child1>
            </div>
        )
    }
}

export default Content;
