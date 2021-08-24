import React, { Component, Fragment } from "react";
import reactable from "reactablejs";
import "./Content.scss";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextLayer from "./otherLayer/TextLayer";
import TableLayer from "./otherLayer/TableLayer";
import MediaLayer from "./otherLayer/MediaLayer";
import MaterialLayer from "./otherLayer/MaterialLayer";
import InteractionLayer from "./otherLayer/InteractionLayer";


import {
  faEdit,
  faTimes,
  faUserEdit,
  faUserTimes,
  faRedo,
  faTrash,
  faCompress,
  faExpand,
} from "@fortawesome/fontawesome-free-solid";
fontawesome.library.add(faEdit, faTimes, faUserEdit, faUserTimes, faRedo, faTrash,faCompress,faExpand);

function Child1(props) {
  const { obj: cptObj, keyData, timeKey, chartData, delIndex, cptIndex, getRef } = props;
  const { id: layerSinId } = keyData;
  const { type: LayerType, cptBorderObj } = cptObj;
  const layerData = chartData.layerData;
  const singleLayerName = ["text", "0", "1","chart","map","chartMap"];
  const mapAndChart = ["0", "1","chart","map","chartMap"];
  return (
    <div
      className={
        cptIndex === delIndex
          ? "itemClick item"
          : "item"
      }
      style={{
        width: "100%",
        height: "100%",
        borderWidth: layerSinId === "singleBorder" ? layerData.borderWidth + "px" : "0px",
        borderStyle: layerSinId === "singleBorder" ? "solid" : "none",
        borderImage:
          layerSinId === "singleBorder"
            ? `url(${require("../img/" + layerData.borderImage)}) 30`
            : "none"
      }}
      ref={getRef}
    >
      {["text"].includes(LayerType) ? (
        <TextLayer
          timeKey={timeKey}
          layerData={layerData}
          layerSinId={layerSinId}
        />
      ) : null}
      {//存放图表和地图的dom["0","1"]
        mapAndChart.includes(LayerType) ? (
          <div
            id={timeKey}
            className="singleChart"
            style={{
              position: "absolute",
              width: cptBorderObj.width + "px",
              height: cptBorderObj.height + "px",
            }}
          ></div>
        ) : null}
      {//当前类型没有在上面添加判断的话都进到这个里面
        !singleLayerName.includes(LayerType) ? (
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
      {
        (
          true?
          <div
            className={'fFutOK grid-item-shade'}
            style={{
              top:mapAndChart.includes(LayerType)?'0%':'-100%'
            }}
          >
            {
              delIndex === cptIndex
              ?<>
                <div className={'t resizable-handler'} style={{cursor: 'n-resize;'}}>
                </div><div className={'l resizable-handler'} style={{cursor: 'w-resize;'}}>
                </div><div className={'b resizable-handler'} style={{cursor: 's-resize;'}}>
                </div><div className={'r resizable-handler'} style={{cursor: 'e-resize;'}}>
                </div><div className={'tl resizable-handler'} style={{cursor: 'nw-resize;'}}>
                </div><div className={'tr resizable-handler'} style={{cursor: 'ne-resize;'}}>
                </div><div className={'br resizable-handler'} style={{cursor: 'se-resize;'}}>
                </div><div className={'bl resizable-handler'} style={{cursor: 'sw-resize;'}}>
                </div><div className={'t square'}></div><div className={'l square'}>
                </div><div className={'b square'}></div><div className={'r square'}>
                </div><div className={'tl square'}></div><div className={'tr square'}>
                </div><div className={'br square'}></div><div className={'bl square'}>
                </div>
              </>
              :null
            }
          </div>
          :null
        )
      }
    </div>
  );
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
      gridEditIcon: [
        {
          icon: faEdit,
          title: "编辑",
          reduceVal: 50,
        },
        {
          icon: faTrash,
          title: "移除",
          reduceVal: 30,
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
    let { left: tempStateLeft, top: tempStateTop } = this.props.obj.cptBorderObj;
    const { dx, dy } = e;
    let xl, xt;
    if (tempStateLeft > 0 || (tempStateLeft === 0 && dx > 0)) {
      xl = tempStateLeft + dx;
    } else if (dx === 0) {
      xl = tempStateLeft;
    } else {
      xl = 0;
    }
    if (tempStateTop > 0 || (tempStateTop === 0 && dy > 0)) {
      xt = tempStateTop + dy;
    } else if (dy === 0) {
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

  onEditItem = () => {
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
    let { chartData } = this.props;
    let { timeKey } = chartData;
    let showDiv = document.getElementById("grid" + timeKey);
    let { offsetLeft, offsetTop, clientWidth, clientHeight } = showDiv;
    let { pageX, pageY } = e;
    let { scrollLeft, scrollTop } = document.documentElement;
    let { scrollLeft: BodyscrollLeft, scrollTop: BodyscrollTop } = document.body;
    const centerX = parseInt(offsetLeft) + clientWidth / 2;
    const centerY = parseInt(offsetTop) + clientHeight / 2;
    const mouseX = pageX - (scrollLeft || BodyscrollLeft);
    const mouseY = pageY - (scrollTop || BodyscrollTop);
    const angleRad = Math.atan2(mouseX - centerX, -(mouseY - centerY));
    const angleDeg = parseInt(angleRad * (180 / Math.PI));
    //console.log("angleRad:" + angleRad + "angleDeg:" + angleDeg)
    this.props.updateLayerPosition([
      { fieldEname: "rotate", fieldValue: angleDeg }
    ]);
  };
  render() {
    let { gridEditIcon } = this.state;
    let { timeKey, chartData, obj, cptIndex, delIndex } = this.props;
    let { opacity, left, top, width, height, rotate, layerBorderStyle, layerBorderWidth, layerBorderColor } = obj.cptBorderObj;
    let { thType } = chartData;
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
            cptIndex === delIndex ?
              <div
                className={'grid-item-scale-show'}
                onMouseDown={this.onRotateMouseDown}
              >
                <div className={'grid-item-scale-show-icon'} ></div>
                <div className={'grid-item-scale-show-line'}></div>
              </div>
              : null
          }
          {
            gridEditIcon.map(item => {
              let iconTitle = item.title;
              let reduceVal = item.reduceVal;
              let icon = item.icon;
              let isFlag = false;
              let eventObj = null;
              if (iconTitle === "移除" || (iconTitle === "编辑" && (thType === "0" || thType === "1"))) {
                isFlag = true;
              }
              if (iconTitle === "移除") {
                eventObj = this.onRemoveItem
              } else if (iconTitle === "编辑") {
                eventObj = this.onEditItem
              }
              return (
                isFlag ?
                  <FontAwesomeIcon
                    icon={icon}
                    className={'grid-item-update-icon'}
                    title={iconTitle}
                    style={{
                      left: width - reduceVal + "px",
                    }}
                    onClick={eventObj} /> : null
              )
            })
          }
          {<ReactableChild
            draggable
            gesturable
            resizable={{
              edges: {
                left: true, top: true,
                bottom: true, right: true,
              },
              margin: 4
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
