/*
 * @Author: your name
 * @Date: 2020-12-23 10:11:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\Statistic1.js
 */
import React, {Component} from 'react';
import {Statistic} from 'antd';
import request from '../../../api/request';

class Statistic1 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {dataSourceUrl, textCenter, backgroundColor, fontFamily, fontSize, fontColor, fontWeight, textAlign, writingMode, title,precision, prefix, suffix} = this.props.layerData;
        let result = "";
        if (dataSourceUrl) {
            result = this.getDataSource(dataSourceUrl);
            Promise.all([result]).then((results) => {
                if (results) {
                    let res = results[0];
                    textCenter.value = res.value;
                }
            });
        }

        return (
            <Statistic
                title={title}
                value={textCenter.value}
                precision={precision}
                valueStyle={{
                    color: fontColor,
                    fontSize: fontSize,
                    backgroundColor: backgroundColor,
                    fontFamily: fontFamily,
                    fontWeight: fontWeight,
                    textAlign: textAlign,
                    writingMode: writingMode
                }}
                prefix={prefix}
                suffix={suffix}
            />
        );
    }

    getDataSource(url) {
        return request({
            url: url,
            method: 'get'
        });
    }
}

export default Statistic1;