/*
 * @Author: your name
 * @Date: 2020-02-19 09:56:36
 * @LastEditTime: 2020-02-19 11:18:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\ShowContent.js
 */
import React, { Component, Fragment } from 'react'
import './Content.css';
import store from '../redux/store';
import CurrentTime from './otherLayer/CurrentTime';
import DefaultText from './otherLayer/DefaultText';
import IframeLayer from './otherLayer/IframeLayer';
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
        {
            return (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderWidth:cptObj.layerBorderWidth,
                        borderStyle:cptObj.layerBorderStyle,
                        borderColor:cptObj.layerBorderColor,
                    }} 
                    >
                    <div id={this.props.id}
                        className="singleChart"
                        style={{
                            position: "absolute",
                            width: cptBorderObj.width - 20 + 'px',
                            height: cptBorderObj.height - 25 + 'px',
                            left: '10px',
                            top: '20px',
                            textAlign:tempLayerType == 'text' ?chartData.textAlign?chartData.textAlign:'':'',
                        }}>
                       {tempLayerType == 'text' ? 
                            layerSinId=="moreRowText" 
                            ?<CurrentTime
                                chartData = {chartData}
                            />
                            :<DefaultText
                                chartData = {chartData}
                            />
                            : null
                        }
                        {tempLayerType == 'iframe' 
                            ? <IframeLayer
                            chartData = {chartData}
                            />
                        : null}
                    </div>
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
                    height: parseInt(cptBorderObj.height)
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
