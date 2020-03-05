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
                            top: '20px'
                        }}>
                        {
                            /* tempLayerType == 'text' ? <a className={'textLayer'}    target={this.props.showData.hyperlinkCenter} >{this.props.showData.textCenter}</a> : '' */
                        }
                        {
                           /*  tempLayerType == 'iframe'?
                            <iframe  className='iframeObj' src={this.props.showData.iframeUrl}  height="100%" width="100%"></iframe>
                            :true */
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
        let cptBorderObj = this.props.obj.cptBorderObj;
        this.state = {
            cptBorderObj: this.props.obj.cptBorderObj,
            left: cptBorderObj.left,
            top: cptBorderObj.top
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
                    id={this.props.id}>
                </Child1>
            </div>
        )
    }
}

export default Content;
