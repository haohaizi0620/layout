/*
 * @Author: your name
 * @Date: 2020-03-20 10:53:15
 * @LastEditTime: 2020-03-23 10:12:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\ContentBottom.js
 */
import React, { Component } from "react";
import { InputNumber, Slider } from "antd";
import "./ContentBottom.scss";
class ContentBottom extends Component {
  static defaultProps = {
    minNumber: 0.17,
    maxNumber: 1.75,
    step: 0.01,
    value: 1
  };
  constructor(props) {
    super(props);
  }

  setCanvasScaleVal = value => {
    this.props.setContentScale(value);
  };

  formatter(value) {
    return parseFloat(value * 100).toFixed(0) + "%";
  }

  render() {
    let props = this.props;
    let scaleValue = props.value;
    return (
      <div className="custom-content-bottom-left">
        <div className="custom-content-bottom-left-item">
          <span>{parseFloat(scaleValue * 100).toFixed(0) + "%"}</span>
        </div>
        <div
          className="custom-content-bottom-left-item"
          style={{ width: "100px" }}
        >
          <Slider
            min={props.minNumber}
            max={props.maxNumber}
            step={props.step}
            onChange={this.setCanvasScaleVal}
            value={typeof scaleValue === "number" ? scaleValue : 1}
            tipFormatter={this.formatter}
          />
        </div>
      </div>
    );
  }
}

export default ContentBottom;
