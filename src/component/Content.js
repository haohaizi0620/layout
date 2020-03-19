import React, { Component, Fragment } from 'react';
import reactable from 'reactablejs';
import './Content.css';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from '../redux/store';
import Mymap from './Mymap';
import CurrentTime from './otherLayer/CurrentTime';
import DefaultText from './otherLayer/DefaultText';
import IframeLayer from './otherLayer/IframeLayer';

import {
  updateShowLayerFieldVal
} from '../redux/actions/showLayerDatas';
import { faEdit, faUserEdit, faUserTimes, faRedo } from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(faEdit, faUserEdit, faUserTimes, faRedo);

class Child1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    {
      let cptObj = this.props.cptObj;
      let keyData = this.props.keyData;
      let layerSinId = keyData.id;
      let tempLayerType = cptObj.type;
      let cptBorderObj = cptObj.cptBorderObj;
      let chartData = this.props.chartData.layerData;
      return (
        <div
          className={this.props.cptIndex == this.props.delIndex ? 'itemClick item' : 'item'}
          style={{
            width: '100%',
            height: '100%',
            borderWidth:tempLayerType == 'border'?chartData.borderWidth+"px":'0px',
            borderStyle:tempLayerType == 'border'?'solid':'none',
            borderImage:tempLayerType == 'border'?`url(${require("../img/"+chartData.borderImage)}) 30`:'none'
          }}
          ref={this.props.getRef}>
          <div
            id={this.props.id}
            className='singleChart'
            style={{
              position: 'absolute',
              width: cptBorderObj.width - 20 + 'px',
              height: cptBorderObj.height - 25 + 'px',
              left: '10px',
              top: '20px',
              textAlign:tempLayerType == 'text'&&chartData ? (chartData.textAlign ? chartData.textAlign : '') : ''
            }}>
            {tempLayerType == 'text' ? 
                layerSinId=="moreRowText" 
                  ?<CurrentTime
                      chartData = {chartData}
                  />
                  :<DefaultText
                     chartData = {chartData}
                  />
                  : null
            }
            {tempLayerType == 'iframe' 
                ? <IframeLayer
                  chartData = {chartData}
                />
              : null}
          </div>
        </div>
      );
    }
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
    this.props.updateLayerPosition(this.props.delIndex, 'multi', [
      { fieldEname: 'left', fieldValue: xl },
      { fieldEname: 'top', fieldValue: xt }
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
  }
    /**
   * @description:  通过指定图层的index进行删除指定的图层
   * @param {type}
   * @return:
   */
  onRemoveItem() {
    this.props.del();
  }

  onEditItem() {
    this.props.editItem();
  }

  onRotateMouseDown = e => {
    console.log("onRotateMouseDown")
    document.addEventListener('mousemove', this.onRotateMouseMove);
    document.addEventListener('mouseup', this.onRotateMouseUp);
  }
  onRotateMouseUp = e => {
    console.log("onRotateMouseUp")
    document.removeEventListener('mousemove', this.onRotateMouseMove);
    // document.removeEventListener('mouseup', this.onRotateMouseUp);
  }
  onRotateMouseMove = e => {
    e.stopPropagation();
    e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    let chartData  = this.props.chartData;
    if(!chartData)
        return;
    let showDiv = document.getElementById("grid"+chartData.timeKey);
    const centerX = parseInt(showDiv.style.left)  + (showDiv.clientWidth / 2);
    const centerY = parseInt(showDiv.style.top) + (showDiv.clientHeight / 2);
    const mouseX = e.pageX - (document.documentElement.scrollLeft || document.body.scrollLeft);
    const mouseY = e.pageY - (document.documentElement.scrollTop || document.body.scrollTop);
    const angleRad = Math.atan2(mouseX - centerX, -(mouseY - centerY));
    const angleDeg = parseInt(angleRad * ( 180 / Math.PI));
    // showDiv.style.transform = `rotate(${angleDeg}deg)`
    this.props.updateLayerPosition(this.props.delIndex, 'multi', [
      { fieldEname: 'rotate', fieldValue:angleDeg },
    ]);
  }
  render() {
    let tempCptObj = this.props.obj.cptBorderObj;
    let timeKey = this.props.id;
    let chartData = this.props.chartData;
    let thType = chartData.thType;
    return (
      <Fragment>
          <div
            className='grid-item'
            id={'grid'+timeKey}
            style={{
              opacity: tempCptObj.opacity,
              left: tempCptObj.left,
              top: tempCptObj.top,
              width: parseInt(tempCptObj.width),
              height: parseInt(tempCptObj.height),
              transform:`rotate(${tempCptObj.rotate}deg)`,
              borderStyle: tempCptObj.layerBorderStyle,
              borderWidth: tempCptObj.layerBorderWidth + 'px',
              borderColor: tempCptObj.layerBorderColor,
            }}>
              {
                this.state.cptIndex != -1 ? 
                <div
                onMouseDown={this.onRotateMouseDown}
                style={{
                  position: 'absolute',
                  height:'100px',
                  width:'100px',
                  left:'-100px',
                  top:'-100px',
                  opacity:0,
                  cursor:`url(${require('../img/icon/rotateIcon.png')}) 14 14,pointer`
                }}></div>:null
              }
              {
               thType=="0"||thType=="1"?
               <FontAwesomeIcon
                  icon={faUserEdit}
                  className='remove'
                  title='编辑'
                  style={{
                    left: tempCptObj.width - 50  + 'px',
                    top: 2 + 'px',
                    width: '20px',
                    color: 'white'
                  }}
                  onClick={this.onEditItem.bind(this)}
                />
               :null
              }
              {
                 thType=="0"||thType=="1"?
                 <FontAwesomeIcon
                 icon={faUserTimes}
                 className='remove'
                 title='移除'
                 style={{
                   left: tempCptObj.width - 30 + 'px',
                   top: 2 + 'px',
                   width: '20px',
                   color: 'white'
                 }}
                 onClick={this.onRemoveItem.bind(this)} />
                :null
              }
              
            <ReactableChild
              draggable
              gesturable
              resizable={{
                // resize from all edges and corners
                edges: { /*left: true,*/ right: true, bottom: true /*, top: true*/ }
              }}
              onDragMove={this.handleDragMove}
              onDragEnd={this.handleEnd}
              onDown={this.handleDown}
              onResizeMove={this.handleResizeMove}
              onResizeEnd={this.handleEnd}
              cptIndex={this.props.cptIndex}
              delIndex={this.props.delIndex}
              cptObj={this.props.obj}
              chartData={this.props.chartData}
              keyData={this.props.keyData}
              id={this.props.id}>
              >
            </ReactableChild>
          </div>
      </Fragment>
    );
  }
}

export default Content;
