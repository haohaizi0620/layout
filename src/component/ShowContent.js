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
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from '../redux/store';
import Mymap from './Mymap';
import {
    faEdit,
    faUserEdit,
    faUserTimes,
    faRedo
} from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(faEdit, faUserEdit, faUserTimes, faRedo);

class Child1 extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var cptObj = this.props.cptObj;
        let tempLayerType = cptObj.type;
        let cptBorderObj = cptObj.cptBorderObj;
        let chartData = this.props.chartData.layerData;    
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
                            width: cptObj.cptBorderObj.width - 20 + 'px',
                            height: cptObj.cptBorderObj.height - 25 + 'px',
                            left: '10px',
                            top: '20px',
                            textAlign:tempLayerType == 'text' ?chartData.textAlign?chartData.textAlign:'':'',
                        }}>
                       {
                            tempLayerType == 'text' ?
                                 <a className={'textLayer'}  
                                        src={chartData.hyperlinkCenter?chartData.hyperlinkCenter:''}
                                        target={chartData.isNewWindow?'_blank':'_self'} 
                                        style={{
                                            fontSize:chartData.fontSize?chartData.fontSize:'30px',
                                            fontFamily:chartData.fontFamily?chartData.fontFamily:'auto',
                                            color:chartData.fontColor?chartData.fontColor:'rgba(255,255,255,1)',
                                            fontWeight:chartData.fontWeight?chartData.fontWeight:'normal',
                                            writingMode:chartData.writingMode?chartData.writingMode:'horizontal-tb',
                                        }}
                                        >{chartData.textCenter?chartData.textCenter:'标题'}
                                </a> :null
                        }
                        {
                            tempLayerType == 'iframe'?
                                <iframe  className='iframeObj'  src={chartData.iframeUrl?chartData.iframeUrl:''}    height="100%" width="100%"></iframe>
                            :null
                        }
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
                    id={this.props.id}>
                </Child1>
            </div>
        )
    }
}

export default Content;
