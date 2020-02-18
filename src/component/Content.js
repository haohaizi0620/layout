import React, { Component, Fragment } from 'react'
import reactable from 'reactablejs'
import './Content.css';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from '../redux/store';
import Mymap from './Mymap';
import { updateShowLayerFieldVal, replaceShowLayerFieldVal, replaceAllShowLayerFieldVal } from '../redux/actions/showLayerDatas';
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
                <div className={this.props.cptIndex == this.props.delIndex ? 'itemClick item' : 'item'}
                    style={{
                        width: '100%',
                        height: '100%'
                    }} ref={this.props.getRef}>
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
                            tempLayerType == 'text' ? <a className={'textLayer'}    target="_self" >标题</a> : ''
                        }
                        {

                            tempLayerType == 'map' || tempLayerType == 'chartMap' ?
                                <Mymap
                                    xWidth={this.props.cptObj.cptBorderObj.width - 20}
                                    xHeight={this.props.cptObj.cptBorderObj.height - 25} ></Mymap> : ''
                        }
                        {
                            tempLayerType == 'iframe'?
                            <iframe  className='iframeObj'  height="100%" width="100%"></iframe>
                            :true
                        }
                    </div>
                </div>
            )
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
    handleDragMove = (e) => {
        if (!this.isSelect()) {
            return;
        }
        let tempStateLeft = this.state.left;
        let tempStateTop = this.state.top;
        const { dx, dy } = e;
        let xl, xt;
        if ((tempStateLeft > 10) || (tempStateLeft == 10 && dx > 0)) {
            xl = tempStateLeft + dx;
        } else if (dx == 0) {
            xl = tempStateLeft;
        } else {
            xl = 10;
        }
        if ((tempStateTop > 10) || (tempStateTop == 10 && dy > 0)) {
            xt = tempStateTop + dy;
        } else if (dy == 0) {
            xt = tempStateTop;
        } else {
            xt = 10;
        }
        this.setState({
            left: xl,
            top: xt
        })
        store.dispatch(updateShowLayerFieldVal({ fieldEname: 'left', fieldValue: xl, layerType: 'chart' }));
        store.dispatch(updateShowLayerFieldVal({ fieldEname: 'top', fieldValue: xt, layerType: 'chart' }));
        this.props.updateGlobalEditData();
        this.props.updateLayerPosition(this.props.delIndex, "multi", [{ fieldEname: 'left', fieldValue: xl }, { fieldEname: 'top', fieldValue: xt }])
    }
    handleResizeMove = (e) => {
        if (this.isSelect()) {
            this.props.handleResizeMove(e)
        }
    }
    handleDown = (e) => {
        if (this.isSelect()) {
            this.props.handleDown(e)
        }
    }
    handleResizeEnd = (e) => {
        if (this.isSelect()) {
            this.props.handleResizeEnd(e)
        }
    }

    isSelect() {
        // return this.props.cptIndex == this.props.delIndex;
        return true;
    }

    /**
     * @description:  通过指定图层的index进行删除指定的图层
     * @param {type} 
     * @return: 
     */
    onRemoveItem() {
        this.props.del(this.props.delIndex);
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
                <FontAwesomeIcon icon={faUserTimes} className='remove' title="移除"
                    style={{ left: this.props.obj.cptBorderObj.width - 30 + 'px', top: 2 + 'px', width: '20px', color: 'white' }}
                    onClick={this.onRemoveItem.bind(this)} />
                <ReactableChild
                    draggable
                    gesturable
                    resizable={{
                        // resize from all edges and corners
                        edges: {/*left: true,*/ right: true, bottom: true/*, top: true*/ }
                    }}
                    onDragMove={this.handleDragMove}
                    onResizeMove={this.handleResizeMove}
                    onResizeEnd={this.handleResizeEnd}
                    onDown={this.handleDown}
                    cptIndex={this.props.cptIndex}
                    delIndex={this.props.delIndex}
                    cptObj={this.props.obj}
                    id={this.props.id}>
                    >
                </ReactableChild>
            </div>
        )
    }
}

export default Content;
