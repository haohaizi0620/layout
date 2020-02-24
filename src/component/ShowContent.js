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
        {
            var tempLayerType = this.props.cptObj.type;
            return (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderWidth:( tempLayerType == 'border')?this.props.showData.borderWidth:'',
                        borderStyle:( tempLayerType == 'border')?this.props.showData.borderStyle:'',
                        borderColor:( tempLayerType == 'border')?this.props.showData.borderColor:'',
                    }} 
                    ref={this.props.getRef}
                    >
                    <div id={this.props.id}
                        className="singleChart"
                        style={{
                            position: "absolute",
                            width: this.props.cptObj.cptBorderObj.width - 20 + 'px',
                            height: this.props.cptObj.cptBorderObj.height - 25 + 'px',
                            left: '10px',
                            top: '20px'
                        }}>
                        {
                            tempLayerType == 'text' ? <a className={'textLayer'}    target={this.props.showData.hyperlinkCenter} >{this.props.showData.textCenter}</a> : ''
                        }
                        {
                            
                        }
                        {
                            tempLayerType == 'iframe'?
                            <iframe  className='iframeObj' src={this.props.showData.iframeUrl}  height="100%" width="100%"></iframe>
                            :true
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
        return (
            <div className="grid-item"
                style={{
                    opacity: this.props.obj.cptBorderObj.opacity,
                    left: this.props.obj.cptBorderObj.left,
                    top: this.props.obj.cptBorderObj.top,
                    width: parseInt(this.props.obj.cptBorderObj.width),
                    height: parseInt(this.props.obj.cptBorderObj.height)
                }}>
                <Child1
                    showData={this.props.showData}
                    cptObj={this.props.obj}
                    id={this.props.id}>
                </Child1>
            </div>
        )
    }
}

export default Content;
