import React, { Component, Fragment } from "react";
import reactable from "reactablejs";
import "./Content.scss";
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
            borderWidth:LayerType === "border" ? layerData.borderWidth + "px" : "0px",
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
              }}>
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
      top: cptBorderObj.top,
      gridEditIcon:[
        {
          icon:faEdit,
          title:"编辑",
          reduceVal:50,
        },
        {
          icon:faTrash,
          title:"移除",
          reduceVal:30,
        }
      ]
    };
  }
  /**
   * @description: 移动图表的位置，修改图表的left 和 top值
   * @param {type}
   * @return:
   */
  handleDragMove = e => {
    let {left:tempStateLeft,top:tempStateTop} = this.props.obj.cptBorderObj;
    const { dx, dy } = e;
    let xl, xt;
    if (tempStateLeft > 0 || (tempStateLeft == 0 && dx > 0)) {
      xl = tempStateLeft + dx;
    } else if (dx == 0) {
      xl = tempStateLeft;
    } else {
      xl = 0;
    }
    if (tempStateTop > 0 || (tempStateTop == 0 && dy > 0)) {
      xt = tempStateTop + dy;
    } else if (dy == 0) {
      xt = tempStateTop;
    } else {
      xt = 0;
    }
    this.props.updateLayerPosition([
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
    let {chartData} = this.props;
    let {timeKey} = chartData;
    let showDiv = document.getElementById("grid" + timeKey);
    let {offsetLeft,offsetTop,clientWidth,clientHeight}  = showDiv;
    let {pageX,pageY} = e;
    let {scrollLeft,scrollTop} = document.documentElement;
    let {scrollLeft:BodyscrollLeft,scrollTop:BodyscrollTop} = document.body;
    const centerX = parseInt(offsetLeft) + clientWidth / 2;
    const centerY = parseInt(offsetTop) + clientHeight / 2;
    const mouseX = pageX - (scrollLeft || BodyscrollLeft);
    const mouseY =  pageY - (scrollTop || BodyscrollTop);
    const angleRad = Math.atan2(mouseX - centerX, -(mouseY - centerY));
    const angleDeg = parseInt(angleRad * (180 / Math.PI));
    console.log("angleRad:"+angleRad+"angleDeg:"+angleDeg)
    this.props.updateLayerPosition([
      { fieldEname: "rotate", fieldValue: angleDeg }
    ]);
  };
  render() {
    let {gridEditIcon} = this.state;
    let {timeKey,chartData,obj,cptIndex,delIndex} = this.props;
    let {opacity,left,top,width,height,rotate,layerBorderStyle,layerBorderWidth,layerBorderColor} = obj.cptBorderObj;
    let {thType} = chartData;
    let grid = `grid${timeKey}`;
    let gridStyle = {
      opacity: opacity,
      left: left,
      top: top,
      width: parseInt(width),
      height: parseInt(height),
      transform: `rotate(${rotate}deg)`,
      borderStyle: layerBorderStyle,
      borderWidth: layerBorderWidth + "px",
      borderColor: layerBorderColor,
    }
    return (
      <Fragment>
        <div
          className={'grid-item'}
          id={grid}
          style={gridStyle}
        >
          {
            cptIndex === delIndex?
            <div
              className={'grid-item-scale-show'}
              onMouseDown={this.onRotateMouseDown}
              /* style={{
                cursor: `url(${require("../img/icon/rotateIcon.png")}) 14 14,pointer`
              }} */
            >
              <div className={'grid-item-scale-show-icon'} ></div>
              <div className={'grid-item-scale-show-line'}></div>
            </div>
            :null
          }
          {
            gridEditIcon.map(item => {
              let iconTitle = item.title;
              let reduceVal = item.reduceVal;
              let icon = item.icon;
              let isFlag = false;
              let eventObj =null;
              if(iconTitle === "移除"||(iconTitle === "编辑"&&(thType  === "0" || thType === "1"))){
                isFlag = true;
              }
              if(iconTitle === "移除"){
                eventObj = this.onRemoveItem
              }else  if(iconTitle === "编辑"){
                eventObj = this.onEditItem
              }
              return(
                    isFlag?
                    <FontAwesomeIcon
                            icon={icon}
                            className={'grid-item-update-icon'}
                            title={iconTitle}
                            style={{
                              left: width - reduceVal + "px",
                            }}
                            onClick={eventObj}/>:null
                 )
            })
          }
         { <ReactableChild
            draggable
            gesturable
            resizable={{
              edges: {
                left: true,top: true , 
                bottom: true, right: true,
              }
            }}
            onDragMove={this.handleDragMove}
            onDragEnd={this.handleEnd}
            onDown={this.handleDown}
            onResizeMove={this.handleResizeMove}
            onResizeEnd={this.handleEnd}
            {...this.props}
          >
          </ReactableChild>}
        </div>
      </Fragment>
    );
  }
}

export default Content;
