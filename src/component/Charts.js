/*
 * @Author: your name
 * @Date: 2020-01-07 09:25:24
 * @LastEditTime : 2020-02-03 12:37:36
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\Charts.js
 */
import React, {Component, Fragment} from 'react';
import ReactEcharts from 'echarts-for-react';
import '../css/Charts.css'
class Charts extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.id}
            className = "singleChart"
            style={{
                position: "absolute",
                opacity:this.props.cptBorderObj.opacity,
                width: this.props.cptBorderObj.width-20 + 'px',
                height: this.props.cptBorderObj.height-20 + 'px',
                // left: this.props.cptBorderObj.left+10 + 'px',
                // top: this.props.cptBorderObj.top +10 + 'px'
            }}>
            </div>
        );
    }
}

export default Charts;