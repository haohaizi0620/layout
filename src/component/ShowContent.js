/*
 * @Author: your name
 * @Date: 2020-02-19 09:56:36
 * @LastEditTime: 2020-03-27 16:39:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\ShowContent.js
 */
import React, { Component } from 'react'
import './Content.scss';
import TextLayer from "./otherLayer/TextLayer";
import TableLayer from "./otherLayer/TableLayer";
import MediaLayer from "./otherLayer/MediaLayer";
import MaterialLayer from "./otherLayer/MaterialLayer";
import InteractionLayer from "./otherLayer/InteractionLayer";
class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var cptObj = this.props.cptObj;
    let LayerType = cptObj.type;
    let cptType = cptObj.cptType;
    let cptBorderObj = cptObj.cptBorderObj;
    let layerData = this.props.chartData.layerData;
    let keyData = this.props.keyData;
    let layerSinId = keyData.id;
    let timeKey = this.props.id;
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderWidth: cptType === 'singleBorder' ? layerData.borderWidth + "px" : '0px',
          borderStyle: cptType === 'singleBorder' ? 'solid' : 'none',
          borderImage: cptType === 'singleBorder' ? `url(${require("../img/" + layerData.borderImage)}) 30` : 'none'
        }}
      >
        {["text"].includes(LayerType) ? (
          <TextLayer
            timeKey={timeKey}
            layerData={layerData}
            layerSinId={layerSinId}
          />
        ) : null}
        {//存放图表和地图的dom["0","1"]
          ["0", "1"].includes(LayerType) ? (
            <div
              id={timeKey}
              className="singleChart"
              style={{
                position: "absolute",
                width: cptBorderObj.width - 20 + "px",
                height: cptBorderObj.height - 25 + "px",
                left: "10px",
                top: "20px",
              }}
            ></div>
          ) : null}
        {//当前类型没有在上面添加判断的话都进到这个里面
          !["text", "0", "1"].includes(LayerType) ? (
            <div
              id={timeKey}
              style={{
                width: "100%",
                height: "100%",
              }}>
              {LayerType === "table" ? (<TableLayer layerData={layerData} layerSinId={layerSinId} />) : null}
              {LayerType === "media" ? (<MediaLayer layerData={layerData} layerSinId={layerSinId} />) : null}
              {LayerType === "material" ? (<MaterialLayer layerData={layerData} layerSinId={layerSinId} />) : null}
              {LayerType === "interaction" ? (<InteractionLayer layerData={layerData} layerSinId={layerSinId} />) : null}
            </div>
          ) : null}
      </div>
    )
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
    let globalBg = this.props.globalBg;
    var widths=document.body.clientWidth;
    var heights=document.body.clientHeight;
    if (cptBorderObj.background !== undefined) {
      return (
        <div className="grid-item"
          style={{
            opacity: cptBorderObj.opacity,
            // left: cptBorderObj.left,
            // top: cptBorderObj.top,
            /*width: parseInt(widths),
            height: parseInt(heights),*/
            width: '100%',
            height: '100%',
            transform: `rotate(${cptBorderObj.rotate}deg)`,
            borderStyle: cptBorderObj.layerBorderStyle,
            borderWidth: cptBorderObj.layerBorderWidth + 'px',
            borderColor: cptBorderObj.layerBorderColor,
            background: cptBorderObj.background,
            zIndex: this.props.chartData.sortNum,

          }}>
          <Child1
            cptObj={cptObj}
            chartData={this.props.chartData}
            keyData={this.props.keyData}
            id={this.props.id}>
          </Child1>
        </div>
      )
    } else {
        /*var widths=document.body.clientWidth;
        var heights=document.body.clientHeight;*/
        var wbfb = widths/globalBg.bjWidth;
        var hbfb = heights/globalBg.bjHeight;

      return (
        <div className="grid-item"
          style={{
            opacity: cptBorderObj.opacity,
              /*left: cptBorderObj.left,
              top: cptBorderObj.top,*/
            width: parseInt(cptBorderObj.width)*wbfb,
            height: parseInt(cptBorderObj.height)*hbfb,
            left: cptBorderObj.left*wbfb,
            top: cptBorderObj.top*hbfb,
            transform: `rotate(${cptBorderObj.rotate}deg)`,
            borderStyle: cptBorderObj.layerBorderStyle,
            borderWidth: cptBorderObj.layerBorderWidth + 'px',
            borderColor: cptBorderObj.layerBorderColor,
            zIndex: this.props.chartData.sortNum,
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
}

export default Content;
