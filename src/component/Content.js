import React, {Component} from 'react'
import reactable from 'reactablejs'
import Charts from './Charts'
import './Content.css';

class Child1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.xwidth,
            height: this.props.xheight,
            xwidth: this.props.xwidth,
            xheight: this.props.xwidth,
            x: this.props.x,
            y: this.props.y,
            xLeft: this.props.xLeft,
            xTop: this.props.xTop
        }
    }

    render() {
        {
            const childXWidth = parseInt(this.props.xwidth);
            const childXHeight = parseInt(this.props.xheight);
            return (
                <div className="item"
                     style={{
                         left: this.props.x,
                         top: this.props.y,
                         width: childXWidth,
                         height: childXHeight
                     }} ref={this.props.getRef}></div>
            )
        }
    }
}

const ReactableChild = reactable(Child1);

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            width: this.props.obj.cptBorderObj.width,
            height: this.props.obj.cptBorderObj.height,
            xWidth: this.props.obj.cptBorderObj.width,
            xHeight: this.props.obj.cptBorderObj.height,
            x: this.props.obj.cptBorderObj.x,
            y: this.props.obj.cptBorderObj.y,
            xLeft: this.props.obj.cptBorderObj.xLeft + 10,
            xTop: this.props.obj.cptBorderObj.xTop + 10
        };
    }

    handleDragMove = (e) => {
        const {dx, dy} = e;
        let xx, yy, xl, xt;
        if ((this.state.x > 0) || (this.state.x == 0 && dx > 0)) {
            xx = this.state.x + dx;
        } else if (dx == 0) {
            xx = this.state.x;
        } else {
            xx = 0;
        }
        if ((this.state.y > 0) || (this.state.y == 0 && dy > 0)) {
            yy = this.state.y + dy;
        } else if (dy == 0) {
            yy = this.state.y;
        } else {
            yy = 0;
        }

        if ((this.state.xLeft > 10) || (this.state.xLeft == 10 && dx > 0)) {
            xl = this.state.xLeft + dx;
        } else if (dx == 0) {
            xl = this.state.xLeft;
        } else {
            xl = 10;
        }
        if ((this.state.xTop > 10) || (this.state.xTop == 10 && dy > 0)) {
            xt = this.state.xTop + dy;
        } else if (dy == 0) {
            xt = this.state.xTop;
        } else {
            xt = 10;
        }

        this.setState({
            x: xx,
            y: yy,
            xLeft: xl,
            xTop: xt
        })
    }
    handleResizeMove = (e) => {
        this.props.handleResizeMove(e);
    }

    handleResizeEnd = (e) => {
        this.props.handleResizeEnd(e);
    }

    onRemoveItem() {
        this.props.del(this.props.delIndex);
    }

    handleDown = (e) => {
        this.props.handleDown(e);
    }

    changeControlPanelStyle(obj) {
        this.props.changeControlPanelStyle(obj);
    }

    render() {
        return (
            <div className="grid-item">
                {<span className='remove' title="移除"
                       style={{left: this.state.xLeft + 'px', top: this.state.xTop + 'px', width: '10px'}}
                       onClick={this.onRemoveItem.bind(this)}
                >x</span>}

                <ReactableChild
                    draggable
                    gesturable
                    resizable={{
                        // resize from all edges and corners
                        edges: {/*left: true,*/ right: true, bottom: true/*, top: true*/}
                    }}
                    onDragMove={this.handleDragMove}
                    onResizeMove={this.handleResizeMove}
                    onResizeEnd={this.handleResizeEnd}
                    onDown={this.handleDown}
                    xwidth={this.props.obj.cptBorderObj.width}
                    xheight={this.props.obj.cptBorderObj.height}
                    {...this.state}>
                </ReactableChild>

                <Charts
                    id={this.props.id}
                    xLeft={this.state.xLeft}
                    xTop={this.state.xTop}
                    xWidth={this.props.obj.cptBorderObj.xWidth}
                    xHeight={this.props.obj.cptBorderObj.xHeight}
                    cptType={this.props.obj.cptType}></Charts>
            </div>
        )
    }
}

export default Content;
