import React, { Component, Fragment } from "react";
import reactable from "reactablejs";
import "./Content.css";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IframeLayer from "./otherLayer/IframeLayer";
import BaseTable from "./otherLayer/BaseTable.jsx";
import DecorateLayer from "./otherLayer/DecorateLayer";
import TextLayer from "./otherLayer/TextLayer";
import SingleImage from "./otherLayer/imageLayer/SingleImage";
import {
  faEdit,
  faTimes,
  faUserEdit,
  faUserTimes,
  faRedo,
  faTrash
} from "@fortawesome/fontawesome-free-solid";
fontawesome.library.add(faEdit, faTimes, faUserEdit, faUserTimes, faRedo,faTrash);

class Child1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      let {obj:cptObj,keyData,timeKey,chartData,delIndex,cptIndex,getRef} = this.props;
      let {id:layerSinId} = keyData;
      let {type:LayerType,cptBorderObj} = cptObj;
      let layerData = chartData.layerData;
      let existTypes = ["text", "0", "1"]; //border，iframe,table
      return (
        <div
          className={
            cptIndex == delIndex
              ? "itemClick item"
              : "item"
          }
          style={{
            width: "100%",
            height: "100%",
            borderWidth:
              LayerType === "border" ? layerData.borderWidth + "px" : "0px",
            borderStyle: LayerType === "border" ? "solid" : "none",
            borderImage:
              LayerType === "border"
                ? `url(${require("../img/" + layerData.borderImage)}) 30`
                : "none"
          }}
          ref={getRef}
        >
          {LayerType === "text" ? (
            <TextLayer
              timeKey={timeKey}
              layerData={layerData}
              layerSinId={layerSinId}
            />
          ) : null}
          {//存放图表和地图的dom
          LayerType === "0" || LayerType === "1" ? (
            <div
              id={timeKey}
              className="singleChart"
              style={{
                position: "absolute",
                width: cptBorderObj.width - 20 + "px",
                height: cptBorderObj.height - 25 + "px",
                left: "10px",
                top: "20px",
                textAlign:
                  LayerType === "text" && layerData
                    ? layerData.textAlign
                      ? layerData.textAlign
                      : ""
                    : ""
              }}
            ></div>
          ) : null}
          {//当前类型没有在上面添加判断的话都进到这个里面
          !existTypes.includes(LayerType) ? (
            <div
              id={timeKey}
              style={{
                width: "100%",
                height: "100%",
                textAlign: layerData
                  ? layerData.textAlign
                    ? layerData.textAlign
                    : ""
                  : ""
              }}
            >
              {LayerType === "iframe" ? ( <IframeLayer layerData={layerData} /> ) : null}
              {LayerType === "table" ? ( <BaseTable data={layerData.tableData} config={layerData.tableConfig} columns={layerData.tableColumns}     /> ) : null}
              {LayerType === "image" && layerSinId === "singleImage"  ? ( <SingleImage layerData={layerData} /> ) : null}
              {LayerType === "decorate"  ? ( <DecorateLayer layerData={layerData} /> ) : null}
            </div>
          ) : null}
        </div>
      );
  }
}

const ReactableChild = reactable(Child1);
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
  /**
   * @description: 移动图表的位置，修改图表的left 和 top值
   * @param {type}
   * @return:
   */
  handleDragMove = e => {
    let tempStateLeft = this.state.left;
    let tempStateTop = this.state.top;
    const { dx, dy } = e;
    let xl, xt;
    if (tempStateLeft > 10 || (tempStateLeft == 10 && dx > 0)) {
      xl = tempStateLeft + dx;
    } else if (dx == 0) {
      xl = tempStateLeft;
    } else {
      xl = 10;
    }
    if (tempStateTop > 10 || (tempStateTop == 10 && dy > 0)) {
      xt = tempStateTop + dy;
    } else if (dy == 0) {
      xt = tempStateTop;
    } else {
      xt = 10;
    }
    this.setState({
      left: xl,
      top: xt
    });
    this.props.updateLayerPosition(this.props.delIndex, "multi", [
      { fieldEname: "left", fieldValue: xl },
      { fieldEname: "top", fieldValue: xt }
    ]);
  };
  handleResizeMove = e => {
    this.props.handleResizeMove(e);
  };
  handleEnd = e => {
    this.props.editDataSource();
  };
  handleDown = e => {
    this.props.handleDown(e);
  };
    /**
   * @description:  通过指定图层的index进行删除指定的图层
   * @param {type}
   * @return:
   */
  onRemoveItem = () => {
    this.props.del();
  }

  onEditItem = () =>  {
    this.props.editItem();
  }
 
  onRotateMouseDown = e => {
    document.addEventListener("mousemove", this.onRotateMouseMove);
    document.addEventListener("mouseup", this.onRotateMouseUp);
  };
  onRotateMouseUp = e => {
    document.removeEventListener("mousemove", this.onRotateMouseMove);
  };
  onRotateMouseMove = e => {
    e.stopPropagation();
    e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    let chartData = this.props.chartData;
    if (!chartData) return;
    let showDiv = document.getElementById("grid" + chartData.timeKey);
    const centerX = parseInt(showDiv.style.left) + showDiv.clientWidth / 2;
    const centerY = parseInt(showDiv.style.top) + showDiv.clientHeight / 2;
    const mouseX =
      e.pageX -
      (document.documentElement.scrollLeft || document.body.scrollLeft);
    const mouseY =
      e.pageY - (document.documentElement.scrollTop || document.body.scrollTop);
    const angleRad = Math.atan2(mouseX - centerX, -(mouseY - centerY));
    const angleDeg = parseInt(angleRad * (180 / Math.PI));
    this.props.updateLayerPosition(this.props.delIndex, "multi", [
      { fieldEname: "rotate", fieldValue: angleDeg }
    ]);
  };
  render() {
    let {timeKey,chartData,obj} = this.props;
    let {opacity,left,top,width,height,rotate,layerBorderStyle,layerBorderWidth,layerBorderColor} = obj.cptBorderObj;
    let {thType} = chartData;
    return (
      <Fragment>
        <div
          className="grid-item"
          id={"grid" + timeKey}
          style={{
            opacity: opacity,
            left: left,
            top: top,
            width: parseInt(width),
            height: parseInt(height),
            transform: `rotate(${rotate}deg)`,
            borderStyle: layerBorderStyle,
            borderWidth: layerBorderWidth + "px",
            borderColor: layerBorderColor
          }}
        >
          {this.state.cptIndex !== -1 ? (
            <div
              onMouseDown={this.onRotateMouseDown}
              style={{
                position: "absolute",
                height: "100px",
                width: "100px",
                left: "-100px",
                top: "-100px",
                opacity: 0,
                cursor: `url(${require("../img/icon/rotateIcon.png")}) 14 14,pointer`
              }}
            ></div>
          ) : null}
          {thType === "0" || thType === "1" ? (
            <FontAwesomeIcon
              icon={faEdit}
              className="remove"
              title="编辑"
              style={{
                left: width - 50 + "px",
                top: 2 + "px",
                width: "20px",
                color: "white"
              }}
              onClick={this.onEditItem}
            />
           ) : null} 
          {
            <FontAwesomeIcon
              icon={faTrash}
              className="remove"
              title="移除"
              style={{
                left: width - 30 + "px",
                top: 2 + "px",
                width: "20px",
                color: "white"
              }}
              onClick={this.onRemoveItem}
            />
          }
          <ReactableChild
            draggable
            gesturable
            resizable={{
              // resize from all edges and corners
              edges: {
                /*left: true,*/ right: true,
                bottom: true /*, top: true*/
              }
            }}
            onDragMove={this.handleDragMove}
            onDragEnd={this.handleEnd}
            onDown={this.handleDown}
            onResizeMove={this.handleResizeMove}
            onResizeEnd={this.handleEnd}
            {...this.props}
          >
            >
          </ReactableChild>
        </div>
      </Fragment>
    );
  }
}

export default Content;
