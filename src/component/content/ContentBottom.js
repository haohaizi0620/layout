/*
 * @Author: your name
 * @Date: 2020-03-20 10:53:15
 * @LastEditTime: 2020-03-20 18:27:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\ContentBottom.js
 */
import React, { Component } from 'react';
import {
    InputNumber,
    Slider,
  } from 'antd';
import './ContentBottom.scss';
class ContentBottom extends Component {
    static defaultProps = {
        minNumber:0.175,
        maxNumber:1.75,
        step:0.01,
        value:1,
    }
    constructor(props) {
        super(props);
    }

    setCanvasScaleVal(scaleVal){
       this.props.setContentScale(scaleVal);    
    }

    render() { 
        let props = this.props;
        let scaleValue = props.value;
        return ( 
            <div className="custom-content-bottom-right">
                <div className="custom-content-bottom-right-item" >
                     <span>{(scaleValue.toFixed(2)*100)+'%'}</span>
                </div>
                <div className="custom-content-bottom-right-item" >
                    <Slider
                        min={props.minNumber}
                        max={props.maxNumber}
                        step={props.step}
                        onChange={event => {
                            this.setCanvasScaleVal(event);
                        }}
                        value={typeof scaleValue === 'number' ? scaleValue : 1}
                    />
                </div>
            </div>
         );
    }
}
 
export default ContentBottom;