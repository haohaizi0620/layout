/*
 * @Author: your name
 * @Date: 2020-02-18 09:22:02
 * @LastEditTime: 2020-02-24 15:26:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\LoadChart.js
 */
/**
 * Created by LEAFER on 2019/7/8.
 */
import React, { Component, Fragment } from 'react';
import ReactEcharts from 'echarts-for-react';
import {chartOption} from "../utils/chart";
import data1 from '../datasource/pic.json';

class LoadChart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Fragment>
                {chartOption(this.props.cptType, this.props.id, data1)}
            </Fragment>
        );
    }
}

export default LoadChart;
