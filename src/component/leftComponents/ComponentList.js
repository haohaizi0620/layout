/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime : 2020-02-14 15:53:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\ComponentList.js
 */
/**
 * Created by LEAFER on 2019/7/3.
 */
import React, { Component } from 'react';

/* 
 * 样式面板组件
 */
class ComponentList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    selectCliclSingleLayer(event, layerObj, layerIndex) {
        this.props.selectCliclSingleLayer(layerObj, layerIndex);
    }


    render() {
        const listDatas = this.props.ComponentList;
        const cptIndex = this.props.cptIndex;
        return (
            <div>
                <div className=""><span>图层（{listDatas?listDatas.length:0}）个</span> </div>
                <div className="">
                    {
                        listDatas?listDatas.map((item, layerIndex) => {
                            return (
                                <div key={layerIndex}    style={{backgroundColor:(layerIndex==cptIndex)?'#2483ff':''}}  onClick={event => { this.selectCliclSingleLayer(event, item, layerIndex) }}      >
                                    <div  name={item.key}>{item.title}</div>
                                </div>
                            )
                        }):null
                    }
                </div>
            </div>
        )
    }
}
export default ComponentList;